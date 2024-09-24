import { z } from "zod";

export const aboutSchema = z.object({
  introduction: z.string().min(1).max(200),
});
