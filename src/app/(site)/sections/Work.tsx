import SectionTitle from "@/app/(site)/_components/SectionTitle";
import WorkCarousel from "@/app/(site)/_components/WorkCarousel";
import React from "react";

const Work = () => {
  return (
    <section className="space-y-16 sticky top-0 md:space-y-40 py-32 bg-background">
      {/* <SectionTitle
        title="work"
        subtitle="he creates custom visuals that elevate live Shows, events, Films, Narratives to an ImmersivE & Otherworldly experience."
      /> */}
      <WorkCarousel />
    </section>
  );
};

export default Work;
