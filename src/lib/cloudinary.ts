import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getCloudinaryId = (url: string) => {
  const splitUrl = url.split("/");
  const publicId = splitUrl[splitUrl.length - 1].split(".")[0];
  return "nichenovus/" + publicId;
};

export default cloudinary;
