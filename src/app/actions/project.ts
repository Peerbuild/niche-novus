"use server";

import prisma from "@/lib/prisma";
import { ActionResponse } from "@/lib/ActionResponse";
import { projectSchema } from "@/lib/schema";
import { z } from "zod";

export const updateProject = async (
  data: z.infer<typeof projectSchema> & { id: string; clientId: string }
) => {
  console.log("data", data);
  console.log("client name", "id", data.id);
  try {
    const { clientId, id, ...projectData } = data;
    const parsedData = projectSchema.parse(projectData);

    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
    });

    if (!id) {
      await prisma.project.create({
        data: {
          ...parsedData,
          videoUrl: "www.youtube.com",
          client: {
            connect: {
              id: client?.id,
            },
          },
        },
      });

      return new ActionResponse("success").json();
    }

    await prisma.project.update({
      where: {
        id,
      },
      data: {
        ...parsedData,
        videoUrl: "www.youtube.com",
        client: {
          connect: {
            id: client?.id,
          },
        },
      },
    });

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};
