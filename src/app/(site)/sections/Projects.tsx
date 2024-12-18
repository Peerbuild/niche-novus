import ProjectCaraousel from "@/app/(site)/_components/ProjectCarousel";
import SectionTitle from "@/app/(site)/_components/SectionTitle";
import React from "react";
import SectionWrapper from "../_components/SectionWrapper";
import Highlights from "./Highlights";
import Footer from "./Footer";
import Video from "../_components/Video";
import { getWorks } from "@/app/actions/work";

const Projects = async () => {
  const projects = await getWorks();
  if (!projects.length) return null;
  return (
    <section
      id="projects"
      className="space-y-6 md:space-y-20 sticky top-0  pt-10 pb-24 md:pb-0   bg-background"
    >
      <div className="absolute w-full h-full left-1/2 inset-0 -translate-x-1/2 ">
        <Video
          src="/projects/project1.mp4"
          autoPlay
          muted
          loop
          className="object-cover hidden md:block h-full w-full opacity-5"
        />
      </div>
      <SectionTitle
        title="projects"
        subtitle="The Visionary Sculptor of Reality and Surreality, Crafting Worlds that Blur the Line Between the Known and the Enigmatic"
      />
      <ProjectCaraousel projects={projects} />
      <Highlights />
    </section>
  );
};

export default Projects;
