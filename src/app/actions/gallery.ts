"use server";

import { ActionResponse } from "@/lib/ActionResponse";
import cloudinary, { getCloudinaryId } from "@/lib/cloudinary";

export const deleteImage = async (imageUrl: string) => {
  try {
    const id = getCloudinaryId(imageUrl);
    await cloudinary.uploader.destroy(id);
    return new ActionResponse("success").json();
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};

export const getGallery = async () => {
  try {
    const data = await cloudinary.api.resources(
      {
        max_results: 10,
        prefix: "nichenovus",
        type: "upload",
      },
      (error, result) => {
        if (error) {
          throw new Error(error.message);
        }
        return result;
      }
    );

    return data.resources;
  } catch (error: any) {
    console.error(error.message);
    return new ActionResponse("error").json();
  }
};
