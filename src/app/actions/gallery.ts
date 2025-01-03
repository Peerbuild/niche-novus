"use server";

import { ActionResponse } from "@/lib/ActionResponse";
import { auth } from "@/lib/auth";
import cloudinary, { getCloudinaryId } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { Gallery } from "@prisma/client";
import { revalidateApp } from "./revalidateApp";

export const deleteImage = async (image: Gallery) => {
  const session = await auth();
  if (!session) {
    return new ActionResponse("error").json();
  }
  try {
    await cloudinary.uploader.destroy(getCloudinaryId(image.imageUrl));
    await prisma.gallery.delete({
      where: {
        id: image.id,
      },
    });

    await revalidateApp();
    return new ActionResponse("success").json();
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};

export const getGallery = async () => {
  const gallery = await prisma.gallery.findMany();
  return gallery;
};

export const updateGallery = async (data: Gallery) => {
  console.log("Update gallery", data);
  const session = await auth();
  if (!session) {
    return new ActionResponse("error").json();
  }
  try {
    if (data.id) {
      await prisma.gallery.update({
        where: {
          id: data.id,
        },
        data: {
          title: data.title,
          imageUrl: data.imageUrl,
        },
      });

      await revalidateApp();
      return new ActionResponse("success").json();
    }

    const image = await prisma.gallery.create({
      data: {
        title: data.title,
        imageUrl: data.imageUrl,
      },
    });

    await revalidateApp();
    return image;
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};
