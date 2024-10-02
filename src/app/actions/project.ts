"use server";

import prisma from "@/lib/prisma";
import { ActionResponse } from "@/lib/ActionResponse";
import { projectSchema } from "@/lib/schema";
import { z } from "zod";
import { Project } from "@prisma/client";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const updateProject = async (
  data: z.infer<typeof projectSchema> & { id: string; clientId: string }
) => {
  try {
    // await sleep(2000);
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
          client: {
            connect: {
              id: client?.id,
            },
          },
        },
      });

      console.log("New Project has been created!", data);

      return new ActionResponse("success").json();
    }

    await prisma.project.update({
      where: {
        id,
      },
      data: {
        ...parsedData,
        client: {
          connect: {
            id: client?.id,
          },
        },
      },
    });

    console.log("Project has been updated!", data);

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};

export const getProjects = async (clientId: string): Promise<Project[]> => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        clientId,
      },
    });

    return projects;
  } catch (error: any) {
    console.log(error.message);
    return new ActionResponse("error").json();
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    console.log("Project has been deleted");

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.log(error.message);
    return new ActionResponse("error").json();
  }
};
