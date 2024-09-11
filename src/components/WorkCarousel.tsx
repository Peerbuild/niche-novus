"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

const works = [
  {
    title: "children of novus",
    description:
      "models and Artworks made by my Architecture and Design students in the course that i taught called D.A.R.T. - Digital Art and Rendering Techniques.",
    profilePic: "/images/about.jpeg",
    primary: "/works/work1/primary.mp4",
    secondary: "/works/work1/secondary.mp4",
  },
  {
    title: "children of novus",
    description:
      "models and Artworks made by my Architecture and Design students in the course that i taught called D.A.R.T. - Digital Art and Rendering Techniques.",
    profilePic: "/images/about.jpeg",
    primary: "/works/work1/primary.mp4",
    secondary: "/works/work1/secondary.mp4",
  },
  {
    title: "children of novus",
    description:
      "models and Artworks made by my Architecture and Design students in the course that i taught called D.A.R.T. - Digital Art and Rendering Techniques.",
    profilePic: "/images/about.jpeg",
    primary: "/works/work1/primary.mp4",
    secondary: "/works/work1/secondary.mp4",
  },
];

const WorkCarousel = () => {
  const [currentInd, setCurrentInd] = useState(0);

  return (
    <div className="w-screen max-w-screen-xl  -left-8 md:left-1/2 md:-translate-x-1/2 relative overflow-hidden md:overflow-visible">
      <Carousel
        opts={{ loop: true }}
        setCurrentInd={setCurrentInd}
        className="mx-10 "
      >
        <CarouselContent className="">
          {works.map((work, index) => (
            <CarouselItem
              className="flex flex-col relative md:flex-row-reverse justify-center items-start gap-6 md:gap-20  basis-[95%] md:basis-full"
              key={index}
              isActive={currentInd === index}
            >
              <video
                src={work.primary}
                width={500}
                height={300}
                className="basis-full"
                autoPlay
                loop
                muted
              />
              <div className="flex md:flex-col-reverse basis-1/3 gap-8 ">
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <div className="size-6 overflow-hidden rounded-full ">
                      <Image
                        src={work.profilePic}
                        alt="profile pic"
                        width={40}
                        height={40}
                      />
                    </div>
                    <h3>{work.title}</h3>
                  </div>
                  <p className="text-justify w-40 md:w-full font-light">
                    {work.description}
                  </p>
                </div>
                <div>
                  <video
                    src={work.secondary}
                    width={400}
                    height={300}
                    autoPlay
                    muted
                    loop
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute w-full  space-x-4   left-1/2 bottom-0 -translate-x-1/2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default WorkCarousel;
