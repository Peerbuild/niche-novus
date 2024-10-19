import WorkCarousel from "@/app/(site)/_components/WorkCarousel";
import React from "react";
import SectionWrapper from "../_components/SectionWrapper";

const Work = () => {
  return (
    <SectionWrapper className="space-y-16 min-h-screen flex justify-center items-center sticky top-0  py-32 bg-background">
      <WorkCarousel />
    </SectionWrapper>
  );
};

export default Work;
