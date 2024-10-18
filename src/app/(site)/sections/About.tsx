"use client";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SectionWrapper from "../_components/SectionWrapper";
import { Button } from "@/components/ui/button";
import Player from "../_components/ReactPlayer";

const About = () => {
  const [isVideo, setIsVideo] = useState({ state: false, count: 0 });
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    if (isVideo.count === 0) {
      return;
    }
    console.log("isVideo", isVideo);
    setShowTransition(true);

    const timeout = setTimeout(() => {
      setShowTransition(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isVideo]);

  return (
    <SectionWrapper className="px-16">
      <div className="absolute w-full inset-0 h-full left-1/2 -translate-x-1/2 -z-10">
        <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-background via-background/80 to-80% to-background"></div>
        <Image
          src={"/bg/bg-2.png"}
          alt="bg-about"
          fill
          className="object-cover relative -z-10 "
        />
      </div>
      <main className="max-w-screen-md space-y-8 mx-auto">
        <div className="aspect-video relative">
          {showTransition && (
            <video
              src="/transition.mp4"
              className="w-full absolute inset-0 z-50 h-full"
              muted
              autoPlay
            />
          )}
          {isVideo.state ? (
            <Player videoId="xKLKl3H9rro" />
          ) : (
            <Image
              src={"/images/about.jpeg"}
              alt="The architect"
              width={600}
              height={400}
              className="mx-auto w-full h-full object-cover object-[50%_30%] "
            />
          )}
        </div>
        <div className="space-y-2">
          <p className="text-justify">
            Niche Novus (Ar. Nishad Kela) weaves a tapestry of visual
            enchantment that defies conventional artistic boundaries, offering a
            tantalizing blend of realism and surrealism.
          </p>
        </div>
        <div className="text-yellow-500 flex justify-between flex-col gap-5 md:flex-row items-center">
          <Button
            onClick={() =>
              setIsVideo({ state: !isVideo.state, count: isVideo.count + 1 })
            }
            variant={"link"}
            className="text-yellow-500 p-0  gap-2 "
          >
            <span className="md:text-base text-md">
              {isVideo.state ? "BACK TO ABOUT" : "DISCOVER LATEST ON YOUTUBE"}
            </span>
            <FeatherIcon
              icon="arrow-up-right"
              className="inline-block "
              size={14}
            />
          </Button>
          <div className="flex gap-6 items-center">
            <FeatherIcon icon="instagram" size={18} />
            <FeatherIcon icon="twitter" size={18} />
          </div>
        </div>
      </main>
    </SectionWrapper>
  );
};

export default About;
