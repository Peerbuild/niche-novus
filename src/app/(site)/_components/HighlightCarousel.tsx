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
import { cn, isInView } from "@/lib/utils";
import { Gallery } from "@prisma/client";

const HighlightCarousel = ({ images }: { images: Gallery[] }) => {
  const [currentInd, setCurrentInd] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);

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
              className={cn(
                "basis-[20rem] relative lg:basis-[25%]  pr-5 pl-7  lg:pl-12 lg:pr-8"
              )}
            >
              <Image
                src={
                  isInView(
                    currentInd,
                    index,
                    images.length > 6 ? 3 : 5,
                    images.length,
                    images.length >= 5 ? true : false
                  )
                    ? image.imageUrl
                    : ""
                }
                alt="Highlights"
                className={cn(
                  "transition-all aspect-square w-full h-full object-cover duration-1000 ",
                  (index === currentInd + 1 ||
                    index === currentInd + 1 - images.length) &&
                    "rotate-12 translate-y-8 md:translate-y-[15%]",
                  (index === currentInd + 2 ||
                    index === currentInd + 2 - images.length) &&
                    "rotate-[25deg] translate-y-[58%]",
                  (index === currentInd - 1 ||
                    index === images.length + (currentInd - 1)) &&
                    "-rotate-12 translate-y-8 md:translate-y-[15%]",
                  (index === currentInd - 2 ||
                    index === images.length + (currentInd - 2)) &&
                    "-rotate-[25deg] translate-y-[58%]",
                  index !== currentInd && "saturate-0",
                  images.length < 5 && "md:rotate-0  md:translate-y-0"
                )}
                width={400}
                height={300}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="w-fit flex gap-14 mx-auto translate-y-20">
        <CarouselPrevious />
        <div className="w-20 flex justify-center items-center   md:text-lg">
          <span className="w-fit text-left  h-fit">
            {images[currentInd].title}
          </span>
        </div>
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default HighlightCarousel;
