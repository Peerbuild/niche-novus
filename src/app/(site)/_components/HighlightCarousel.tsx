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
      className="overflow-visible"
    >
      <CarouselContent>
        {images.map((image, index) => {
          return (
            <CarouselItem
              key={index}
              isActive
              className={cn(
                "basis-[16rem] sm:basis-1/4 overflow-visible pr-4 pl-6  md:pl-16"
              )}
            >
              <Image
                src={"/images/highlights/" + image}
                alt="Highlights"
                className={cn(
                  "transition-transform w-full duration-700 ",
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
                    "-rotate-[25deg] translate-y-[58%]"
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
