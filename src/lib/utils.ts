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

export function isInView(
  currentInd: number,
  index: number,
  slidesToShow: number,
  numberOfSlides: number
): boolean {
  const startInd =
    (currentInd - slidesToShow + numberOfSlides) % numberOfSlides;
  const endInd = (currentInd + slidesToShow) % numberOfSlides;

  if (startInd < endInd) {
    return index >= startInd && index <= endInd;
  } else {
    return index >= startInd || index <= endInd;
  }
}

export const getTimeOfDay = () => {
  const time = new Date().getHours();
  if (time < 5 || time > 20) {
    return "Night";
  } else if (time < 12) {
    return "Morning";
  } else if (time < 17) {
    return "Afternoon";
  } else {
    return "Evening";
  }
};
