import WorkCarousel from "@/app/(site)/_components/WorkCarousel";
import React from "react";
import SectionWrapper from "../_components/SectionWrapper";

const Work = () => {
  return (
    <SectionWrapper
      id="work"
      className=" min-h-screen flex justify-center items-center    bg-background"
    >
      <WorkCarousel />
    </SectionWrapper>
  );
};

export default Work;
