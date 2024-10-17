"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Gallery } from "@prisma/client";
import image from "next/image";

const HighlightCarousel = ({ images }: { images: Gallery[] }) => {
  const [currentInd, setCurrentInd] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  return (
    <Carousel
      opts={{ loop: true, duration: 28 }}
      setApi={(api) => {
        api?.on("scroll", () => {
          setIsScrolling(true);
        });
        api?.on("settle", () => {
          setIsScrolling(false);
        });
      }}
      setCurrentInd={setCurrentInd}
    >
      <CarouselContent>
        {images.map((image, index) => {
          return (
            <CarouselItem
              key={image.id}
              isActive
              className={cn(
                "basis-[16rem] relative sm:basis-1/4  pr-4 pl-6  md:pl-16"
              )}
            >
              <Image
                src={image.imageUrl}
                alt="Highlights"
                className={cn(
                  "transition-all w-full h-full object-cover duration-1000 ",
                  (index === currentInd + 1 ||
                    index === currentInd + 1 - images.length) &&
                    "rotate-12 translate-y-6 md:translate-y-[15%]",
                  (index === currentInd + 2 ||
                    index === currentInd + 2 - images.length) &&
                    "rotate-[25deg] translate-y-32 md:translate-y-[58%]",
                  (index === currentInd - 1 ||
                    index === images.length + (currentInd - 1)) &&
                    "-rotate-12 translate-y-6 md:translate-y-[15%]",
                  (index === currentInd - 2 ||
                    index === images.length + (currentInd - 2)) &&
                    "-rotate-[25deg] translate-y-[58%]",
                  index !== currentInd && "saturate-0"
                )}
                width={400}
                height={300}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="w-fit flex gap-14 mx-auto translate-y-32">
        <CarouselPrevious />
        <div className="w-20 flex justify-center   text-lg">
          <span className="w-fit text-left">{images[currentInd].title}</span>
        </div>
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default HighlightCarousel;
