import ProjectCaraousel from "@/components/ProjectCarousel";
import SectionTitle from "@/components/SectionTitle";
import React from "react";

const Projects = () => {
  return (
    <section className="space-y-20  py-10">
      <SectionTitle
        title="projects"
        subtitle="The Visionary Sculptor of Reality and Surreality, Crafting Worlds that Blur the Line Between the Known and the Enigmatic"
      />
      <ProjectCaraousel />
    </section>
  );
};

export default Projects;
