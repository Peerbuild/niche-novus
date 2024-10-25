"use server";

import { revalidatePath } from "next/cache";

export const revalidateApp = async () => {
  revalidatePath("/", "layout");
};
