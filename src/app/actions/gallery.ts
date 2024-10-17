"use server";

import { ActionResponse } from "@/lib/ActionResponse";
import cloudinary, { getCloudinaryId } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { gallerySchema } from "@/lib/schema";
import { Gallery } from "@prisma/client";
import { z } from "zod";

export const deleteImage = async (image: Gallery) => {
  try {
    await cloudinary.uploader.destroy(getCloudinaryId(image.imageUrl));
    await prisma.gallery.delete({
      where: {
        id: image.id,
      },
    });

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
      return new ActionResponse("success").json();
    }

    await prisma.gallery.create({
      data: {
        title: data.title,
        imageUrl: data.imageUrl,
      },
    });

    return new ActionResponse("success").json();
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};
