"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const works = [
  {
    groupTitle: "First Group Title",
    projects: [
      {
        title: "children of novus",
        description:
          "1models and Artworks made by my Architecture and Design students in the course that i taught called D.A.R.T. - Digital Art and Rendering Techniques.",
        profilePic: "/images/about.jpeg",
        primary: "/works/work1/primary.mp4",
        secondary: "/works/work1/secondary.mp4",
      },
      {
        title: "3children of novus",
        description:
          "2models and Artworks made by my Architecture and Design students in the course that i taught called D.A.R.T. - Digital Art and Rendering Techniques.",
        profilePic: "/images/about.jpeg",
        primary: "/works/work1/primary.mp4",
        secondary: "/works/work1/secondary.mp4",
      },
      {
        title: "2children of novus",
        description:
          "3models and Artworks made by my Architecture and Design students in the course that i taught called D.A.R.T. - Digital Art and Rendering Techniques.",
        profilePic: "/images/about.jpeg",
        primary: "/works/work1/primary.mp4",
        secondary: "/works/work1/secondary.mp4",
      },
    ],
  },
  {
    groupTitle: "Second Group Title",
    projects: [
      {
        title: "1children of novus",
        description:
          "models and Artworks made by my Architecture and Design students in the course that i taught called D.A.R.T. - Digital Art and Rendering Techniques.",
        profilePic: "/images/about.jpeg",
        primary: "/works/work1/primary.mp4",
        secondary: "/works/work1/secondary.mp4",
      },
      {
        title: "3children of novus",
        description:
          "2models and Artworks made by my Architecture and Design students in the course that i taught called D.A.R.T. - Digital Art and Rendering Techniques.",
        profilePic: "/images/about.jpeg",
        primary: "/works/work1/primary.mp4",
        secondary: "/works/work1/secondary.mp4",
      },
      {
        title: "4children of novus",
        description:
          "3models and Artworks made by my Architecture and Design students in the course that i taught called D.A.R.T. - Digital Art and Rendering Techniques.",
        profilePic: "/images/about.jpeg",
        primary: "/works/work1/primary.mp4",
        secondary: "/works/work1/secondary.mp4",
      },
    ],
  },
  {
    groupTitle: "Third Group Title",
    projects: [
      {
        title: "project 3-1",
        description: "Description for project 3-1.",
        profilePic: "/images/project3-1.jpeg",
        primary: "/works/work1/primary.mp4",
        secondary: "/works/work1/secondary.mp4",
      },
      {
        title: "project 3-2",
        description: "Description for project 3-2.",
        profilePic: "/images/project3-2.jpeg",
        primary: "/works/work3/primary.mp4",
        secondary: "/works/work3/secondary.mp4",
      },
    ],
  },
  {
    groupTitle: "Fourth Group Title",
    projects: [
      {
        title: "project 4-1",
        description: "Description for project 4-1.",
        profilePic: "/images/project4-1.jpeg",
        primary: "/works/work4/primary.mp4",
        secondary: "/works/work4/secondary.mp4",
      },
    ],
  },
  {
    groupTitle: "Fifth Group Title",
    projects: [
      {
        title: "project 5-1",
        description: "Description for project 5-1.",
        profilePic: "/images/project5-1.jpeg",
        primary: "/works/work5/primary.mp4",
        secondary: "/works/work5/secondary.mp4",
      },
      {
        title: "project 5-2",
        description: "Description for project 5-2.",
        profilePic: "/images/project5-2.jpeg",
        primary: "/works/work5/primary.mp4",
        secondary: "/works/work5/secondary.mp4",
      },
    ],
  },
  {
    groupTitle: "Sixth Group Title",
    projects: [
      {
        title: "project 6-1",
        description: "Description for project 6-1.",
        profilePic: "/images/project6-1.jpeg",
        primary: "/works/work6/primary.mp4",
        secondary: "/works/work6/secondary.mp4",
      },
    ],
  },
  {
    groupTitle: "Seventh Group Title",
    projects: [
      {
        title: "project 7-1",
        description: "Description for project 7-1.",
        profilePic: "/images/project7-1.jpeg",
        primary: "/works/work7/primary.mp4",
        secondary: "/works/work7/secondary.mp4",
      },
    ],
  },
  {
    groupTitle: "Eighth Group Title",
    projects: [
      {
        title: "project 8-1",
        description: "Description for project 8-1.",
        profilePic: "/images/project8-1.jpeg",
        primary: "/works/work8/primary.mp4",
        secondary: "/works/work8/secondary.mp4",
      },
      {
        title: "project 8-2",
        description: "Description for project 8-2.",
        profilePic: "/images/project8-2.jpeg",
        primary: "/works/work8/primary.mp4",
        secondary: "/works/work8/secondary.mp4",
      },
    ],
  },
  {
    groupTitle: "Ninth Group Title",
    projects: [
      {
        title: "project 9-1",
        description: "Description for project 9-1.",
        profilePic: "/images/project9-1.jpeg",
        primary: "/works/work9/primary.mp4",
        secondary: "/works/work9/secondary.mp4",
      },
    ],
  },
  {
    groupTitle: "Tenth Group Title",
    projects: [
      {
        title: "project 10-1",
        description: "Description for project 10-1.",
        profilePic: "/images/project10-1.jpeg",
        primary: "/works/work10/primary.mp4",
        secondary: "/works/work10/secondary.mp4",
      },
      {
        title: "project 10-2",
        description: "Description for project 10-2.",
        profilePic: "/images/project10-2.jpeg",
        primary: "/works/work10/primary.mp4",
        secondary: "/works/work10/secondary.mp4",
      },
    ],
  },
  {
    groupTitle: "Eleventh Group Title",
    projects: [
      {
        title: "project 11-1",
        description: "Description for project 11-1.",
        profilePic: "/images/project11-1.jpeg",
        primary: "/works/work11/primary.mp4",
        secondary: "/works/work11/secondary.mp4",
      },
    ],
  },
  {
    groupTitle: "Twelfth Group Title",
    projects: [
      {
        title: "project 12-1",
        description: "Description for project 12-1.",
        profilePic: "/images/project12-1.jpeg",
        primary: "/works/work12/primary.mp4",
        secondary: "/works/work12/secondary.mp4",
      },
      {
        title: "project 12-2",
        description: "Description for project 12-2.",
        profilePic: "/images/project12-2.jpeg",
        primary: "/works/work12/primary.mp4",
        secondary: "/works/work12/secondary.mp4",
      },
    ],
  },
];

const WorkCarousel = () => {
  const [currentGroupInd, setCurrentGroupInd] = useState(0);
  const [currentProjectInd, setCurrentProjectInd] = useState(0);

  return (
    <div className="w-screen  space-y-20  -left-8 md:left-1/2 md:-translate-x-1/2 relative overflow-hidden md:overflow-visible">
      <Carousel
        opts={{ loop: true }}
        setApi={(api) => {
          api?.scrollTo(currentGroupInd);
        }}
        setCurrentInd={setCurrentGroupInd}
        setNestedInd={setCurrentProjectInd}
      >
        <CarouselContent className="">
          {works.map((work, index) => (
            <CarouselItem
              className="basis-auto pl-10"
              isActive={index === currentGroupInd}
              key={work.groupTitle}
            >
              <div
                className={cn(
                  "uppercase opacity-50 transition-opacity font-medium",
                  index === currentGroupInd && "scale-125 opacity-100"
                )}
              >
                {work.groupTitle}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="w-20 h-0.5 bg-foreground mx-auto mt-4 rounded-full translate-x-3"></div>
      </Carousel>
      <div className="flex gap-24 items-center max-w-screen-xl mx-auto">
        <div className="flex-[0.4_0_0%] space-y-6">
          <div className="space-y-6">
            <video
              src={works[currentGroupInd].projects[currentProjectInd].secondary}
              width={400}
              height={250}
              autoPlay
              muted
              loop
            />
            <div className="space-y-4 overflow-hidden">
              <Carousel
                setApi={(api) => {
                  api?.scrollTo(currentProjectInd);
                }}
                setCurrentInd={setCurrentProjectInd}
              >
                <CarouselContent>
                  {works[currentGroupInd].projects.map((project, index) => (
                    <CarouselItem
                      className="basis-auto"
                      isActive={index === currentProjectInd}
                      key={project.title}
                    >
                      <h3
                        className={cn(
                          "text-base opacity-50 transition-opacity",
                          index === currentProjectInd && "opacity-100"
                        )}
                      >
                        {works[currentGroupInd].projects[index].title}{" "}
                        {index !==
                          works[currentGroupInd].projects.length - 1 && (
                          <span className="pl-2">/</span>
                        )}
                      </h3>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <p>
                {works[currentGroupInd].projects[currentProjectInd].description}
              </p>
            </div>
          </div>
          <div className="space-x-4">
            <PrevProjectButton
              currentProjectInd={currentProjectInd}
              setCurrentProjectInd={setCurrentProjectInd}
              currentGroupInd={currentGroupInd}
              setCurrentGroupInd={setCurrentGroupInd}
            />
            <NextProjectButton
              currentProjectInd={currentProjectInd}
              setCurrentProjectInd={setCurrentProjectInd}
              currentGroupInd={currentGroupInd}
              setCurrentGroupInd={setCurrentGroupInd}
            />
          </div>
        </div>
        <div className="flex-1">
          <video
            src={works[currentGroupInd].projects[currentProjectInd].primary}
            width={600}
            height={400}
            autoPlay
            muted
            loop
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

const NextProjectButton = ({
  currentProjectInd,
  setCurrentProjectInd,
  currentGroupInd,
  setCurrentGroupInd,
}: {
  currentProjectInd: number;
  setCurrentProjectInd: Dispatch<SetStateAction<number>>;
  currentGroupInd: number;
  setCurrentGroupInd: Dispatch<SetStateAction<number>>;
}) => {
  const handleNextProject = () => {
    setCurrentProjectInd(
      (prev) => (prev + 1) % works[currentGroupInd].projects.length
    );
    if (currentProjectInd === works[currentGroupInd].projects.length - 1) {
      setCurrentGroupInd((prev) => (prev + 1) % works.length);
    }
  };
  return (
    <Button
      onClick={handleNextProject}
      size={"icon"}
      className="rounded-full"
      variant={"outline"}
    >
      <ArrowRightIcon className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
};

const PrevProjectButton = ({
  currentProjectInd,
  setCurrentProjectInd,
  currentGroupInd,
  setCurrentGroupInd,
}: {
  currentProjectInd: number;
  setCurrentProjectInd: Dispatch<SetStateAction<number>>;
  currentGroupInd: number;
  setCurrentGroupInd: Dispatch<SetStateAction<number>>;
}) => {
  const handlePrevProject = () => {
    const isFirstProject = currentProjectInd === 0;
    const prevGroupInd = (currentGroupInd - 1 + works.length) % works.length;
    const newGroupInd = isFirstProject ? prevGroupInd : currentGroupInd;
    const projectsLength = works[newGroupInd].projects.length;

    const newProjectInd = isFirstProject
      ? projectsLength - 1
      : (currentProjectInd - 1) % projectsLength;

    setCurrentGroupInd(newGroupInd);
    setCurrentProjectInd(newProjectInd);
  };
  return (
    <Button
      onClick={handlePrevProject}
      size={"icon"}
      className="rounded-full"
      variant={"outline"}
    >
      <ArrowLeftIcon className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
};

export default WorkCarousel;
