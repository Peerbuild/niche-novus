"use server";

import cloudinary from "@/lib/cloudinary";

export const getSignature = async () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "nichenovus" },
    cloudinary.config().api_secret!
  );

  return { timestamp, signature };
};
