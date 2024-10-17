import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const isUploading = (uploadProgress: Record<string, number>) =>
  Object.values(uploadProgress).some(
    (progress) => progress > 0 && progress < 100
  );
