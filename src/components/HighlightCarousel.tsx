"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const HighlightCarousel = ({ images }: { images: string[] }) => {
  const _images = [...images, ...images];
  const [currentInd, setCurrentInd] = useState(0);
  return (
    <Carousel
      opts={{ loop: true, duration: 28 }}
      setCurrentInd={setCurrentInd}
      className="overflow-visible"
    >
      <CarouselContent>
        {_images.map((image, index) => {
          return (
            <CarouselItem
              key={index}
              isActive
              className={cn("basis-auto overflow-visible pl-16")}
            >
              <Image
                src={"/images/highlights/" + image}
                alt="Highlights"
                style={
                  {
                    //   rotate: `${(currentInd - index) * 12}deg`,
                  }
                }
                className={cn(
                  "transition-transform duration-700 ",
                  index === currentInd + 1 && "rotate-12 translate-y-12",
                  index === currentInd + 2 && "rotate-[25deg] translate-y-52",
                  index === currentInd - 1 && "-rotate-12 translate-y-12",
                  index === currentInd - 2 && "-rotate-[25deg] translate-y-52"
                )}
                width={400}
                height={300}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselNext className="translate-y-40" />
    </Carousel>
  );
};

export default HighlightCarousel;
