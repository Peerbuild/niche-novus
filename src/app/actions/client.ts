"use server";
import { ActionResponse } from "@/lib/ActionResponse";
import prisma from "@/lib/prisma";
import { Client } from "@prisma/client";
import { z } from "zod";
import { deleteProject } from "./project";
import { auth } from "@/lib/auth";

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

      return new ActionResponse("success").json();
    }

    await prisma.client.create({
      data: {
        name: parsedData.name,
      },
    });

    console.log(`New Client ${data.name} has been created`);

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.log(error.message);
    return new ActionResponse("error").json();
  }
};

export const getClients = async () => {
  const clients = await prisma.client.findMany({
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

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.log(error.message);
    return new ActionResponse("error").json();
  }
};
