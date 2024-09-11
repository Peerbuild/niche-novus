"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

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
  {
    title: "the architect4.",
    description: "One-stop3",
    image: "/projects/project1.mp4",
  },
  {
    title: "the architect5.",
    description: "One-stop3",
    image: "/projects/project2.mp4",
  },
  {
    title: "the architect6.",
    description: "One-stop3",
    image: "/projects/project3.mp4",
  },
];

const ProjectCaraousel = () => {
  const [currentInd, setCurrentInd] = useState(0);

  return (
    <div className="w-screen  max-w-screen-lg mx-auto -left-8 lg:left-0 py-20 relative overflow-hidden">
      <Carousel opts={{ loop: true }} setCurrentInd={setCurrentInd}>
        <CarouselContent className="mx-16 md:mx-0">
          {projects.map((project, index) => (
            <CarouselItem
              isActive={currentInd === index}
              className="basis-[24rem] pl-8"
              key={index}
            >
              <video
                src={project.image}
                className={cn(
                  "transition-transform",
                  currentInd === index ? "scale-100" : "scale-90"
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
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
          <div>
            {projects.map((project, index) => (
              <div
                key={index}
                className={cn(
                  " hidden max-w-44 md:max-w-64 mt-4 space-y-2 mx-auto text-base",
                  currentInd === index && "block"
                )}
              >
                <h3 className="font-semibold md:text-xl">{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
          <div className=" hidden mt-6  lg:block w-fit mx-auto space-x-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default ProjectCaraousel;
