"use client";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import React, { useState } from "react";
import SectionWrapper from "../_components/SectionWrapper";
import { Button } from "@/components/ui/button";
import Player from "../_components/ReactPlayer";

const About = () => {
  const [isVideo, setIsVideo] = useState(false);
  return (
    <SectionWrapper>
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
        <div className="aspect-video">
          {isVideo ? (
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
            One-stop-shop for all the latest and greatest digital products to
            help you earn online. From trading software to reselling
            communities, we&apos;ve got you.
          </p>
        </div>
        <div className="text-yellow-500 flex justify-between items-center">
          <Button
            onClick={() => setIsVideo(!isVideo)}
            variant={"link"}
            className="text-yellow-500 p-0  gap-2 "
          >
            <span>DISCOVER LATEST ON YOUTUBE</span>
            <FeatherIcon
              icon="arrow-up-right"
              className="inline-block "
              size={14}
            />
          </Button>
          <div className="flex gap-2 items-center">
            <FeatherIcon icon="instagram" size={18} />
            <FeatherIcon icon="twitter" size={18} />
          </div>
        </div>
      </main>
    </SectionWrapper>
  );
};

export default About;
