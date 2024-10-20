"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import Video from "./Video";

const projects = [
  {
    title: "slow rush",
    description:
      "In a towering megacity, time blurs as people chase elusive dreams, lost in the relentless pace of progress",
    image: "/projects/project1.mp4",
  },
  {
    title: "the architect2.",
    description: "One-stop2",
    image: "/projects/project2.mp4",
  },
  {
    title: "the architect3.",
    description: "One-stop3",
    image: "/projects/project3.mp4",
  },
];

const ProjectCaraousel = () => {
  const [currentInd, setCurrentInd] = useState(0);

  return (
    <div className="w-full  max-w-screen-lg mx-auto   py-20 relative overflow-hidden">
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
          {projects.map((project, index) => (
            <CarouselItem
              isActive={currentInd === index}
              className="basis-[16rem] md:basis-[22rem] pl-4 md:pl-8"
              key={index}
            >
              <Video
                src={project.image}
                className={cn(
                  "transition-all duration-500",
                  currentInd === index
                    ? "scale-100 brightness-100 saturate-100"
                    : "scale-90 brightness-50 saturate-0"
                )}
                width={500}
                height={300}
                muted
                autoPlay
                loop
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="  max-w-44 md:max-w-64 mt-10 space-y-2 mx-auto text-base ">
          <div className="-translate-y-28">
            <AnimatePresence>
              <motion.h2
                key={currentInd}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="absolute  text-lg md:text-xl font-semibold"
              >
                {projects[currentInd].title}
              </motion.h2>
            </AnimatePresence>
            <AnimatePresence>
              <motion.p
                key={currentInd}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-base text-justify absolute mt-9 md:mt-12"
              >
                {projects[currentInd].description}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className=" pt-20  lg:block w-fit mx-auto space-x-8">
            <CarouselPrevious size={"icon"} variant={"outline"} />
            <CarouselNext size={"icon"} variant={"outline"} />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default ProjectCaraousel;
