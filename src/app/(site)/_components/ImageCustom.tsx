import { Loader2 } from "lucide-react";
import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

const ImageCustom = ({ alt, ...props }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="relative">
      {isLoaded && (
        <div className="absolute bg-background/20 backdrop-blur w-full h-full flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <Image {...props} alt={alt} onLoad={() => setIsLoaded(false)} />
    </div>
  );
};

export default ImageCustom;
