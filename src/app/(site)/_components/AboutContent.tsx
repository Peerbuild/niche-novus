"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FeatherIcon from "feather-icons-react";
import React, { useEffect, useState } from "react";
import EncryptText from "./EncryptText";
import { Icons } from "./Icons";
import Player from "./ReactPlayer";
import Image from "next/image";
import { About } from "@prisma/client";

const AboutContent = ({ data, videoId }: { data: About; videoId: string }) => {
  const [isVideo, setIsVideo] = useState({ state: false, count: 0 });
  const [showTransition, setShowTransition] = useState(false);
  const transitionRef = React.useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isVideo.count === 0) {
      return;
    }

    setShowTransition(true);
    transitionRef.current?.play();

    const timeout = setTimeout(() => {
      setShowTransition(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isVideo]);

  return (
    <div>
      <main className="max-w-screen-md space-y-8 mx-auto ">
        <div className="aspect-video relative">
          <video
            src="/transition.mp4"
            className={cn(
              "w-full absolute inset-0 z-50 h-full opacity-0 pointer-events-none",
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
              src={data.image}
              alt="The architect"
              width={600}
              height={400}
              className="mx-auto w-full h-full object-cover object-[50%_30%] "
            />
          )}
        </div>
        <div className="space-y-2">
          <p className="text-justify">{data.introduction}</p>
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
    </div>
  );
};

export default AboutContent;
