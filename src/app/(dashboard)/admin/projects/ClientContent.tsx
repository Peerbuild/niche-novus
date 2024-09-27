import React, { useState } from "react";
import AddProjectButton from "./AddProjectButton";
import ProjectForm from "./ProjectForm";
import { projectSchema } from "@/lib/schema";
import { z } from "zod";

const ClientContent = ({
  initialProjects,
  clientName,
}: {
  initialProjects: z.infer<typeof projectSchema>[];
  clientName: string;
}) => {
  const [projects, setProjects] = useState(initialProjects);
  return (
    <div>
      {projects.map((project) => {
        return (
          <ProjectForm
            clientName={clientName}
            key={project.title}
            project={project}
          />
        );
      })}
      <AddProjectButton setProjects={setProjects} />
    </div>
  );
};

export default ClientContent;
