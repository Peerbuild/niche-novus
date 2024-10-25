import { PlayCircleIcon } from "lucide-react";
import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

const ImageCustom = ({ alt, ...props }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(true);
  return (
    <div className="relative h-full w-full">
      {isLoaded && (
        <div className="absolute bg-muted/40 animate-pulse backdrop-blur w-full h-full flex justify-center items-center">
          <PlayCircleIcon className="text-muted-foreground" />
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
