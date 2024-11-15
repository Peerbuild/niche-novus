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
  numberOfSlides: number,
  isLoop: boolean = true
): boolean {
  if (isLoop) {
    // Logic when looping is enabled
    const startInd =
      (currentInd - slidesToShow + numberOfSlides) % numberOfSlides;
    const endInd = (currentInd + slidesToShow) % numberOfSlides;

    if (startInd < endInd) {
      return index >= startInd && index <= endInd;
    } else {
      return index >= startInd || index <= endInd;
    }
  } else {
    // Logic when looping is disabled
    const startInd = Math.max(currentInd - slidesToShow, 0);
    const endInd = Math.min(currentInd + slidesToShow, numberOfSlides - 1);

    return index >= startInd && index <= endInd;
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

export function createWebpDeliveryUrl(secureUrl: string) {
  const uploadIndex = secureUrl.indexOf("/upload/");
  if (uploadIndex === -1) {
    throw new Error("Invalid Cloudinary secure_url");
  }

  const baseUrl = secureUrl.slice(0, uploadIndex + 8);
  const restOfUrl = secureUrl.slice(uploadIndex + 8);

  const transformation = "w_800/f_webp,fl_animated,fl_awebp/e_loop";

  const transformedUrl = `${baseUrl}${transformation}/${restOfUrl}`;

  return transformedUrl;
}

export function isTransformedWebp(url: string) {
  return url.includes("f_webp");
}
