"use client";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SectionWrapper from "../_components/SectionWrapper";
import { Button } from "@/components/ui/button";
import Player from "../_components/ReactPlayer";
import { cn } from "@/lib/utils";
import { Icons } from "../_components/Icons";
import EncryptText from "../_components/EncryptText";

const About = () => {
  const [isVideo, setIsVideo] = useState({ state: false, count: 0 });
  const [showTransition, setShowTransition] = useState(false);
  const transitionRef = React.useRef<HTMLVideoElement | null>(null);
  const [videoId, setVideoId] = useState<string>("");

  useEffect(() => {
    if (isVideo.count === 0) {
      return;
    }
    const fetchLatestVideo = async () => {
      const url =
        "https://yt-api.p.rapidapi.com/channel/videos?id=UCGy35-fzwsvocifL1cvAacQ";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!,
          "x-rapidapi-host": "yt-api.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);
      const result = await response.json();

      setVideoId(result.data[0].videoId);
    };

    fetchLatestVideo();

    setShowTransition(true);
    transitionRef.current?.play();

    const timeout = setTimeout(() => {
      setShowTransition(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isVideo]);

  return (
    <SectionWrapper
      id="about"
      className="px-16 min-h-screen flex justify-center items-center"
    >
      <div className="absolute w-full inset-0 h-full left-1/2 -translate-x-1/2 -z-10">
        <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-background via-background/80 to-80% to-background"></div>
        <Image
          src={"/bg/bg-2.png"}
          alt="bg-about"
          fill
          className="object-cover relative -z-10 "
        />
      </div>
      <main className="max-w-screen-md space-y-8 mx-auto ">
        <div className="aspect-video relative">
          <video
            src="/transition.mp4"
            className={cn(
              "w-full absolute inset-0 z-50 h-full opacity-0",
              showTransition && "opacity-100"
            )}
            ref={transitionRef}
            muted
            autoPlay
          />
          {isVideo.state ? (
            <Player videoId={videoId} />
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
            className="text-yellow-500 p-0 h-fit gap-2 "
          >
            <EncryptText
              TARGET_TEXT={
                isVideo.state ? "BACK TO ABOUT" : "DISCOVER LATEST ON YOUTUBE"
              }
              INITIAL_TEXT={
                isVideo.state ? "DISCOVER LATEST ON YOUTUBE" : "BACK TO ABOUT"
              }
            />
          </Button>
          <div className="flex gap-6 items-center">
            <a href="https://www.instagram.com/nichenovus/">
              <FeatherIcon icon="instagram" size={18} />
            </a>
            <a href="">
              <FeatherIcon icon="twitter" size={18} />
            </a>
            <a href="">
              <Icons.behance />
            </a>
            <a href="https://www.artstation.com/nichenovus">
              <Icons.artstation />
            </a>
          </div>
        </div>
      </main>
    </SectionWrapper>
  );
};

export default About;
