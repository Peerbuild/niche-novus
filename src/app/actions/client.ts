"use server";
import { ActionResponse } from "@/lib/ActionResponse";
import prisma from "@/lib/prisma";
import { Client } from "@prisma/client";
import { z } from "zod";

export const updateClient = async (data: Client) => {
  console.log("data", data);
  try {
    const parsedData = z.object({ name: z.string() }).parse(data);

    const isClientExist = await prisma.client.findFirst({
      where: {
        name: parsedData.name,
      },
    });

    if (!data.id || !isClientExist) {
      await prisma.client.create({
        data: {
          name: parsedData.name,
        },
      });

      return new ActionResponse("success").json();
    }

    await prisma.client.update({
      where: {
        id: isClientExist.id,
      },
      data: parsedData,
    });

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

  console.log("clients", clients);

  return clients;
};
