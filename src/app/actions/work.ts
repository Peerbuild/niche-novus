"use server";
import { ActionResponse } from "@/lib/ActionResponse";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Work } from "@prisma/client";
import { revalidateApp } from "./revalidateApp";

export const updateWork = async (data: Work) => {
  const session = await auth();
  if (!session) {
    return new ActionResponse("error").json();
  }
  try {
    const { id, ...workData } = data;
    const work = await prisma.work.update({
      where: {
        id: id,
      },
      data: workData,
    });

    await revalidateApp();
    return work;
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};

export const createWork = async (data: Work) => {
  const session = await auth();
  if (!session) {
    return new ActionResponse("error").json();
  }
  console.log(data);
  try {
    const { id, ...workData } = data;
    const work = await prisma.work.create({
      data: workData,
    });

    await revalidateApp();
    return work;
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
  const session = await auth();
  if (!session) {
    return new ActionResponse("error").json();
  }
  try {
    await prisma.work.delete({
      where: {
        id,
      },
    });

    await revalidateApp();
    return new ActionResponse("success").json();
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};
