"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { cn, isInView } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { Project, Work } from "@prisma/client";
import { ClientWithProjects } from "@/types/types";
import ImageCustom from "./ImageCustom";

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

const WorkCarousel = ({ works }: { works: ClientWithProjects[] }) => {
  const [currentGroupInd, setCurrentGroupInd] = useState(0);
  const [currentProjectInd, setCurrentProjectInd] = useState(0);

  return (
    <div className="w-full space-y-14 md:space-y-20  md:left-1/2 md:-translate-x-1/2 relative overflow-hidden md:overflow-hidden">
      <Carousel
        opts={{ loop: true, watchDrag: true }}
        setApi={(api) => {
          api?.scrollTo(currentGroupInd);
        }}
        setCurrentInd={setCurrentGroupInd}
        setNestedInd={setCurrentProjectInd}
        className="max-w-screen-xl mx-auto overflow-hidden"
        plugins={
          [
            // Autoplay({
            //   delay: 5000 * works[currentGroupInd].projects.length - 300,
            //   stopOnInteraction: true,
            // }),
          ]
        }
      >
        <div className="absolute w-full h-full bg-gradient-to-l pointer-events-none from-background via-transparent to-background z-20"></div>
        <CarouselContent className=" ">
          {works?.map((work, index) => (
            <CarouselItem
              className={cn(
                "basis-auto  md:pl-10 pl-8",
                index === currentGroupInd && "md:pl-16 md:pr-6",
                index === 0 && "md:pl-16"
              )}
              isActive={index === currentGroupInd}
              key={work.id}
            >
              <div
                className={cn(
                  "uppercase opacity-50 transition-opacity cursor-pointer  font-medium",
                  index === currentGroupInd &&
                    "scale-110 md:scale-125  opacity-100 "
                )}
                onClick={() => {
                  setCurrentGroupInd(index);
                  setCurrentProjectInd(0);
                }}
              >
                {work.name}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="w-20 h-0.5 bg-foreground/40 mx-auto mt-4 rounded-full translate-x-3"></div>
      </Carousel>
      <div className="flex gap-6 md:gap-6 2xl:gap-24  px-8   xl:px-48 flex-col-reverse md:flex-row  items-center max-w-screen-2xl mx-auto">
        <div className="flex-[0.4_0_0%] space-y-6">
          <div className=" overflow-hidden flex flex-row-reverse md:flex-col gap-6">
            <Carousel
              setApi={(api) => {
                api?.scrollTo(currentProjectInd);
              }}
              className="overflow-hidden flex-[0_0_40%]"
            >
              <CarouselContent className="ml-0">
                {works[currentGroupInd].Project.map((project, index) => {
                  console.log(
                    currentProjectInd,
                    index,
                    works[currentGroupInd].Project.length,
                    isInView(
                      currentProjectInd,
                      index,
                      0,
                      works[currentGroupInd].Project.length,
                      false
                    ),
                    works[currentGroupInd].Project[index].title
                  );
                  return (
                    <CarouselItem
                      isActive
                      key={project.secondaryVideoUrl}
                      className="pl-0 bg-black aspect-video overflow-hidden relative"
                    >
                      {isInView(
                        currentProjectInd,
                        index,
                        0,
                        works[currentGroupInd].Project.length,
                        false
                      ) && (
                        <ImageCustom
                          key={index}
                          src={project.secondaryVideoUrl}
                          alt={project.title}
                          width={400}
                          height={250}
                          loaderSize={0.4}
                          className="w-auto mx-auto h-full"
                        />
                      )}
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
            <div className="space-y-4 overflow-hidden flex-1">
              <Carousel
                opts={{ watchDrag: true }}
                setApi={(api) => {
                  api?.scrollTo(currentProjectInd);
                }}
                setCurrentInd={setCurrentProjectInd}
                plugins={[
                  Autoplay({
                    delay: 5000,
                    stopOnInteraction: true,
                  }),
                ]}
              >
                <CarouselContent>
                  {works[currentGroupInd].Project.map((project, index) => (
                    <CarouselItem
                      className="basis-auto"
                      isActive={index === currentProjectInd}
                      key={project.title}
                    >
                      <h3
                        className={cn(
                          "text-sm  lg:text-base opacity-50 transition-opacity  cursor-pointer",
                          index === currentProjectInd && "opacity-100"
                        )}
                        onClick={() => setCurrentProjectInd(index)}
                      >
                        {works[currentGroupInd].Project[index].title}{" "}
                        {index !==
                          works[currentGroupInd].Project.length - 1 && (
                          <span className="pl-2">/</span>
                        )}
                      </h3>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <p className="lg:text-base  text-sm text-justify">
                {works[currentGroupInd].Project[currentProjectInd].description}
              </p>
            </div>
          </div>
          <div className="space-x-8 text-center  pt-8 md:pt-0">
            <PrevProjectButton
              currentProjectInd={currentProjectInd}
              setCurrentProjectInd={setCurrentProjectInd}
              currentGroupInd={currentGroupInd}
              setCurrentGroupInd={setCurrentGroupInd}
              works={works}
            />
            <NextProjectButton
              works={works}
              currentProjectInd={currentProjectInd}
              setCurrentProjectInd={setCurrentProjectInd}
              currentGroupInd={currentGroupInd}
              setCurrentGroupInd={setCurrentGroupInd}
            />
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <Carousel
            setApi={(api) => {
              api?.scrollTo(currentProjectInd);
            }}
          >
            <CarouselContent>
              {works[currentGroupInd].Project.map((project, index) => {
                return (
                  <CarouselItem
                    isActive={index === currentProjectInd}
                    key={project.primaryVideoUrl}
                    className="pl-0"
                  >
                    {isInView(
                      currentProjectInd,
                      index,
                      0,
                      works[currentGroupInd].Project.length,
                      false
                    ) && (
                      <ImageCustom
                        src={project.primaryVideoUrl}
                        alt={project.title}
                        width={800}
                        height={600}
                        loaderSize={0.6}
                        onLoad={() => console.log("loaded")}
                        className="w-full aspect-video"
                      />
                    )}
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
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
  works,
}: {
  currentProjectInd: number;
  setCurrentProjectInd: Dispatch<SetStateAction<number>>;
  currentGroupInd: number;
  setCurrentGroupInd: Dispatch<SetStateAction<number>>;
  works: ClientWithProjects[];
}) => {
  const handleNextProject = () => {
    setCurrentProjectInd(
      (prev) => (prev + 1) % works[currentGroupInd].Project.length
    );
    if (currentProjectInd === works[currentGroupInd].Project.length - 1) {
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
  works,
}: {
  currentProjectInd: number;
  setCurrentProjectInd: Dispatch<SetStateAction<number>>;
  currentGroupInd: number;
  setCurrentGroupInd: Dispatch<SetStateAction<number>>;
  works: ClientWithProjects[];
}) => {
  const handlePrevProject = () => {
    const isFirstProject = currentProjectInd === 0;
    const prevGroupInd = (currentGroupInd - 1 + works.length) % works.length;
    const newGroupInd = isFirstProject ? prevGroupInd : currentGroupInd;
    const projectsLength = works[newGroupInd].Project.length;

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
