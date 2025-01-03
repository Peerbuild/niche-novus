"use server";

import prisma from "@/lib/prisma";
import { ActionResponse } from "@/lib/ActionResponse";
import { Project } from "@prisma/client";
import cloudinary, { getCloudinaryId } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";
import { revalidateApp } from "./revalidateApp";

export const updateProject = async (data: Project) => {
  const session = await auth();
  if (!session) {
    return new ActionResponse("error").json();
  }
  try {
    // await sleep(2000);
    const { id, ...projectData } = data;

    const client = await prisma.client.findUnique({
      where: {
        id: projectData.clientId,
      },
    });

    if (!id) {
      const newProject = await prisma.project.create({
        data: projectData,
      });

      console.log("New Project has been created!", data);

      await revalidateApp();
      return newProject;
    }

    await revalidateApp();
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
  const session = await auth();
  if (!session) {
    return new ActionResponse("error").json();
  }
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

    await revalidateApp();
    return new ActionResponse("success").json();
  } catch (error: any) {
    console.log(error.message);
    return new ActionResponse("error").json();
  }
};
