"use server";

import prisma from "@/lib/prisma";
import { ActionResponse } from "@/lib/ActionResponse";
import { projectSchema } from "@/lib/schema";
import { z } from "zod";

export const updateProject = async (
  data: z.infer<typeof projectSchema> & { clientName: string }
) => {
  console.log("data", data);
  try {
    const { clientName, ...projectData } = data;
    const parsedData = projectSchema.parse(projectData);

    const client = await prisma.client.findFirst({
      where: {
        name: clientName,
      },
    });

    const isProjectExist = await prisma.project.findFirst({
      where: {
        title: parsedData.title,
      },
    });

    if (isProjectExist) {
      await prisma.project.update({
        where: {
          id: isProjectExist.id,
        },
        data: parsedData,
      });
    } else {
      await prisma.project.create({
        data: {
          videoUrl: "www.youtube.com",
          ...parsedData,
          client: {
            connect: {
              id: client?.id,
            },
          },
        },
      });
    }

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};
