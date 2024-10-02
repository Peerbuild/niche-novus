import { z } from "zod";

export const aboutSchema = z.object({
  introduction: z.string().min(1).max(200),
  videoUrl: z.string(),
});

export const projectSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(150),
  primaryVideoUrl: z.string(),
  secondaryVideoUrl: z.string(),
});

export const workSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(150),
});
