"use server";

import prisma from "@/lib/prisma";
import { ActionResponse } from "@/lib/ActionResponse";
import { projectSchema } from "@/lib/schema";
import { z } from "zod";

export const updateProject = async (data: z.infer<typeof projectSchema>) => {
  console.log("data", data);
  try {
    const parsedData = projectSchema.parse(data);

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};
