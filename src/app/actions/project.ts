"use server";

import prisma from "@/lib/prisma";
import { ActionResponse } from "@/lib/ActionResponse";
import { Project } from "@prisma/client";
import cloudinary, { getCloudinaryId } from "@/lib/cloudinary";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const updateProject = async (data: Project) => {
  try {
    // await sleep(2000);
    const { id, ...projectData } = data;

    const client = await prisma.client.findUnique({
      where: {
        id: projectData.clientId,
      },
    });

    if (!id) {
      await prisma.project.create({
        data: projectData,
      });

      console.log("New Project has been created!", data);

      return new ActionResponse("success").json();
    }

    await prisma.project.update({
      where: {
        id,
      },
      data: projectData,
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
    const project = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    const { primaryVideoUrl, secondaryVideoUrl } = project;

    const deletePrimaryVideo = cloudinary.uploader.destroy(
      getCloudinaryId(primaryVideoUrl),
      {
        resource_type: "video",
      }
    );
    const deleteSecondaryVideo = cloudinary.uploader.destroy(
      getCloudinaryId(secondaryVideoUrl),
      {
        resource_type: "video",
      }
    );

    await Promise.all([deletePrimaryVideo, deleteSecondaryVideo]);

    console.log("Project has been deleted");

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.log(error.message);
    return new ActionResponse("error").json();
  }
};
