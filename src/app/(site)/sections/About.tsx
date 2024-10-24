import Image from "next/image";
import React, { useEffect, useState } from "react";
import SectionWrapper from "../_components/SectionWrapper";
import AboutContent from "../_components/AboutContent";
import { getAbout } from "@/app/actions/about";

const fetchLatestVideo = async () => {
  const url =
    "https://yt-api.p.rapidapi.com/channel/videos?id=UCGy35-fzwsvocifL1cvAacQ";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.YOUTUBE_API_KEY!,
      "x-rapidapi-host": "yt-api.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);
  const result = await response.json();
  return result.data[0].videoId;
};

const About = async () => {
  const data = await getAbout();
  const videoId = await fetchLatestVideo();

  if (!data) return null;

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
      <AboutContent data={data} videoId={videoId} />
    </SectionWrapper>
  );
};

export default About;
