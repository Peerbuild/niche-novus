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
    title: "the architect.",
    description: "One-stop",
    image: "/images/about.jpeg",
  },
  {
    title: "the architect2.",
    description: "One-stop2",
    image: "/images/about.jpeg",
  },
  {
    title: "the architect3.",
    description: "One-stop3",
    image: "/images/about.jpeg",
  },
];

const ProjectCaraousel = () => {
  const [currentInd, setCurrentInd] = useState(0);

  return (
    <div className="w-screen -left-8 relative overflow-hidden">
      <Carousel setCurrentInd={setCurrentInd}>
        <CarouselContent className="mx-16">
          {projects.map((project, index) => (
            <CarouselItem
              className="basis-64"
              key={index}
              isActive={currentInd === index}
            >
              <Image
                src={project.image}
                alt="Project"
                width={500}
                height={300}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div>
        {projects.map((project, index) => (
          <div
            key={index}
            className={cn(
              " hidden max-w-44 mt-4 space-y-2 mx-auto text-base",
              currentInd === index && "block"
            )}
          >
            <h3 className="font-semibold">{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCaraousel;
