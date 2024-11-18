"use server";
import { ActionResponse } from "@/lib/ActionResponse";
import prisma from "@/lib/prisma";
import { Client } from "@prisma/client";
import { z } from "zod";
import { deleteProject } from "./project";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { revalidateApp } from "./revalidateApp";

export const updateClient = async (data: Client) => {
  const session = await auth();
  if (!session) {
    return new ActionResponse("error").json();
  }
  try {
    const parsedData = z.object({ name: z.string() }).parse(data);

    if (data.id) {
      const isClientExist = await prisma.client.findUnique({
        where: {
          id: data.id,
        },
      });

      await prisma.client.update({
        where: {
          id: isClientExist?.id,
        },
        data: parsedData,
      });

      console.log(`Client ${data.name} has been updated`);

      await revalidateApp();
      return new ActionResponse("success").json();
    }

    const count = await prisma.client.count();

    await prisma.client.create({
      data: {
        name: parsedData.name,
        order: count,
      },
    });

    await revalidateApp();
    console.log(`New Client ${data.name} has been created`);

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.log(error.message);
    return new ActionResponse("error").json();
  }
};

export const updateClientOrder = async (data: {
  id: string;
  oldIndex: number;
  newIndex: number;
}) => {
  const session = await auth();
  if (!session) {
    return new ActionResponse("error").json();
  }

  try {
    if (data.oldIndex === data.newIndex) {
      return new ActionResponse("success").json();
    }

    const queries = [];

    if (data.newIndex > data.oldIndex) {
      queries.push(
        prisma.client.updateMany({
          where: {
            order: {
              gt: data.oldIndex,
              lte: data.newIndex,
            },
          },
          data: {
            order: {
              decrement: 1,
            },
          },
        })
      );
    } else {
      queries.push(
        prisma.client.updateMany({
          where: {
            order: {
              gte: data.newIndex,
              lt: data.oldIndex,
            },
          },
          data: {
            order: {
              increment: 1,
            },
          },
        })
      );
    }

    queries.push(
      prisma.client.update({
        where: {
          id: data.id,
        },
        data: {
          order: data.newIndex,
        },
      })
    );

    await Promise.all(queries);
    await revalidateApp();

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.log(error.message);
    return new ActionResponse("error").json();
  }
};

export const getClients = async () => {
  const clients = await prisma.client.findMany({
    orderBy: {
      order: "asc",
    },
    include: {
      Project: true,
    },
  });

  return clients;
};

export const deleteClient = async (clientId: string) => {
  const session = await auth();
  if (!session) {
    return new ActionResponse("error").json();
  }
  try {
    const projects = await prisma.project.findMany({
      where: {
        clientId,
      },
    });

    const deleteProjects = [];
    for (const project of projects) {
      deleteProjects.push(deleteProject(project.id));
    }

    await Promise.all(deleteProjects);

    await prisma.client.delete({
      where: {
        id: clientId,
      },
    });

    console.log(`Client with id:${clientId} has been deleted`);
    await revalidateApp();

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.log(error.message);
    return new ActionResponse("error").json();
  }
};
