"use server";
import { ActionResponse } from "@/lib/ActionResponse";
import prisma from "@/lib/prisma";
import { Work } from "@prisma/client";

export const updateWork = async (data: Work) => {
  try {
    const { id, ...workData } = data;
    await prisma.work.update({
      where: {
        id: id,
      },
      data: workData,
    });

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};

export const createWork = async (data: Work) => {
  console.log(data);
  try {
    const { id, ...workData } = data;
    await prisma.work.create({
      data: workData,
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
