import ProjectCaraousel from "@/app/(site)/_components/ProjectCarousel";
import SectionTitle from "@/app/(site)/_components/SectionTitle";
import React from "react";
import SectionWrapper from "../_components/SectionWrapper";
import Highlights from "./Highlights";
import Footer from "./Footer";
import Video from "../_components/Video";

const Projects = () => {
  return (
    <section className="space-y-20 sticky top-0  pt-10 pb-24  bg-background">
      <div className="absolute w-full h-full left-1/2 inset-0 -translate-x-1/2 ">
        <Video
          src="/projects/project1.mp4"
          autoPlay
          muted
          loop
          className="object-cover h-full w-full opacity-5"
        />
      </div>
      <SectionTitle
        title="projects"
        subtitle="The Visionary Sculptor of Reality and Surreality, Crafting Worlds that Blur the Line Between the Known and the Enigmatic"
      />
      <ProjectCaraousel />
      <Highlights />
      <Footer />
    </section>
  );
};

export default Projects;
