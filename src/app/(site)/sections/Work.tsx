import SectionTitle from "@/app/(site)/_components/SectionTitle";
import WorkCarousel from "@/app/(site)/_components/WorkCarousel";
import React from "react";

const Work = () => {
  return (
    <section className="space-y-16 md:space-y-40 py-14">
      {/* <SectionTitle
        title="work"
        subtitle="he creates custom visuals that elevate live Shows, events, Films, Narratives to an ImmersivE & Otherworldly experience."
      /> */}
      <WorkCarousel />
    </section>
  );
};

export default Work;
