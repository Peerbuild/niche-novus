import { PlayCircleIcon } from "lucide-react";
import Image, { ImageProps } from "next/image";
import React, { useState } from "react";
import Loader, { LoaderAnimation } from "./Loader";

const ImageCustom = ({
  alt,
  loaderSize = 1,
  ...props
}: ImageProps & { loaderSize?: number }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  return (
    <div className="relative h-full w-full">
      {isLoaded && (
        <div className="absolute bg-muted/40 animate-pulse backdrop-blur w-full h-full flex justify-center items-center">
          <LoaderAnimation scale={loaderSize} />
        </div>
      )}
      <Image
        {...props}
        alt={alt}
        onLoad={() => {
          setIsLoaded(false);
        }}
      />
    </div>
  );
};

export default ImageCustom;
