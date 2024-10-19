import WorkCarousel from "@/app/(site)/_components/WorkCarousel";
import React from "react";
import SectionWrapper from "../_components/SectionWrapper";

const Work = () => {
  return (
    <SectionWrapper className="space-y-16 min-h-screen flex justify-center items-center sticky top-0 md:space-y-40 py-32 bg-background">
      {/* <SectionTitle
        title="work"
        subtitle="he creates custom visuals that elevate live Shows, events, Films, Narratives to an ImmersivE & Otherworldly experience."
      /> */}
      <WorkCarousel />
    </SectionWrapper>
  );
};

export default Work;
