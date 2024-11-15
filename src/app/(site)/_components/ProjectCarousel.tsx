"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn, isInView } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import Video from "./Video";
import { Work } from "@prisma/client";

const ProjectCaraousel = ({ projects }: { projects: Work[] }) => {
  const [currentInd, setCurrentInd] = useState(0);

  return (
    <div className="w-full  max-w-[62rem] mx-auto   py-20 relative overflow-hidden">
      <Carousel
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        setCurrentInd={setCurrentInd}
      >
        <CarouselContent className="">
          {projects.map((project, index) => {
            return (
              <CarouselItem
                className="basis-[16rem] md:basis-[22rem] pl-4 md:pl-8"
                key={project.id}
              >
                <Video
                  src={
                    isInView(currentInd, index, 2, projects.length)
                      ? project.videoUrl
                      : ""
                  }
                  className={cn(
                    "transition-all duration-500",
                    currentInd === index
                      ? "scale-100 brightness-100 saturate-100"
                      : "scale-90 brightness-50 saturate-0"
                  )}
                  isActive={currentInd === index}
                  width={500}
                  height={300}
                  muted
                  loop
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="  max-w-40 md:max-w-64 mt-10 space-y-2 mx-auto text-base ">
          <div className="-top-20 min-h-16 lg:min-h-48 -translate-y-20 md:-top-32">
            <h2 key={currentInd} className="md:text-xl font-semibold">
              {projects[currentInd].title}
            </h2>
            <p className="text-sm md:text-base text-justify mt-2 ">
              {projects[currentInd].description}
            </p>
          </div>
          <div className="  lg:block w-fit mx-auto space-x-8">
            <CarouselPrevious size={"icon"} variant={"outline"} />
            <CarouselNext size={"icon"} variant={"outline"} />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default ProjectCaraousel;
