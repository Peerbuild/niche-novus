import WorkCarousel from "@/app/(site)/_components/WorkCarousel";
import React from "react";
import SectionWrapper from "../_components/SectionWrapper";
import { getClients } from "@/app/actions/client";

const Work = async () => {
  const works = await getClients();
  if (!works.length) return null;
  return (
    <SectionWrapper
      id="work"
      className=" min-h-screen flex justify-center items-center    bg-background"
    >
      <WorkCarousel works={works} />
    </SectionWrapper>
  );
};

export default Work;
