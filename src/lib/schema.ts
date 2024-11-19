import { z } from "zod";

const MAX_UPLOAD_SIZE = 25 * 1024 * 1024;
const WORKS_MAX_UPLOAD_SIZE = 2.5 * 1024 * 1024;

export const aboutSchema = z.object({
  introduction: z.string().min(1).max(200),
  image: z.union([
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(File)
          .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
          }, "File size must be less than 1.5mb")
          .refine((file) => {
            return file.type.includes("image");
          }, "File must be a image"),
    z.string().min(1),
  ]),
});

export const projectSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(150),
  primaryVideoUrl: z.union([
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(File)
          .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
          }, "File size must be less than 1.5mb")
          .refine((file) => {
            return file.type.includes("video") || file.type.includes("image");
          }, "file must be a video or image"),
    z.string().min(1),
  ]),
  secondaryVideoUrl: z.union([
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(File)
          .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
          }, "File size must be less than 1.5mb")
          .refine((file) => {
            return file.type.includes("video") || file.type.includes("image");
          }, "file must be a video or image"),
    z.string().min(1),
  ]),
});

export const workSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(150),
  videoUrl: z.union([
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(File)
          .refine((file) => {
            return !file || file.size <= WORKS_MAX_UPLOAD_SIZE;
          }, "File size must be less than 1.5mb")
          .refine((file) => {
            return file.type.includes("video");
          }, "File must be a video"),
    z.string().min(1),
  ]),
});

export const gallerySchema = z.object({
  title: z.string().min(1).max(36),
  imageUrl: z.union([
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(File)
          .refine((file) => {
            return !file || file.size <= WORKS_MAX_UPLOAD_SIZE;
          }, "File size must be less than 1.5mb")
          .refine((file) => {
            return file.type.includes("image");
          }, "File must be a image"),
    z.string().min(1),
  ]),
});
