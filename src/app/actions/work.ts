"use server";
import { ActionResponse } from "@/lib/ActionResponse";
import prisma from "@/lib/prisma";
import { workSchema } from "@/lib/schema";
import { z } from "zod";

export const updateWork = async (
  data: z.infer<typeof workSchema> & { id: string }
) => {
  try {
    const parsedData = workSchema.parse(data);

    await prisma.work.update({
      where: {
        id: data.id,
      },
      data: parsedData,
    });

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};

export const createWork = async (data: z.infer<typeof workSchema>) => {
  console.log(data);
  try {
    const parsedData = workSchema.parse(data);

    await prisma.work.create({
      data: { ...parsedData, videoUrl: "www.youtube.com" },
    });

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};

export const getWorks = async () => {
  const works = await prisma.work.findMany();

  return works;
};

export const removeWork = async (id: string) => {
  try {
    await prisma.work.delete({
      where: {
        id,
      },
    });

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};
