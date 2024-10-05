"use server";

import prisma from "@/lib/prisma";
import { ActionResponse } from "@/lib/ActionResponse";
import { aboutSchema } from "@/lib/schema";
import { z } from "zod";
import { About } from "@prisma/client";

export const getAbout = async () => {
  try {
    const about = await prisma.about.findFirst();
    return about;
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};

export const updateAbout = async (data: About) => {
  try {
    const oldAbout = await prisma.about.findFirst();

    if (oldAbout) {
      await prisma.about.update({
        where: {
          id: oldAbout.id,
        },
        data,
      });
    } else {
      await prisma.about.create({
        data,
      });
    }

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};
