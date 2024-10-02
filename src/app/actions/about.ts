"use server";

import prisma from "@/lib/prisma";
import { ActionResponse } from "@/lib/ActionResponse";
import { aboutSchema } from "@/lib/schema";
import { z } from "zod";

export const getAbout = async () => {
  try {
    const about = await prisma.about.findFirst();
    return about;
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};

export const updateAbout = async (data: z.infer<typeof aboutSchema>) => {
  try {
    const parsedData = aboutSchema.parse(data);

    const oldAbout = await prisma.about.findFirst();

    if (oldAbout) {
      await prisma.about.update({
        where: {
          id: oldAbout.id,
        },
        data: parsedData,
      });
    } else {
      await prisma.about.create({
        data: parsedData,
      });
    }

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};
