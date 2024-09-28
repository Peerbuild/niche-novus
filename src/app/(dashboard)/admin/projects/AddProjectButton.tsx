"use client";
import { Button } from "@/components/ui/button";
import { projectSchema } from "@/lib/schema";
import { Project } from "@prisma/client";
import FeatherIcon from "feather-icons-react";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

const AddProjectButton = ({
  setProjects,
  clientId,
}: {
  setProjects: Dispatch<SetStateAction<Project[]>>;
  clientId: string;
}) => {
  const handleAddProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        id: "",
        title: "New Project",
        description: "Description",
        videoUrl: "www.youtube.com",
        clientId,
      },
    ]);
  };

  return (
    <Button
      className=" w-fit mx-auto gap-2"
      onClick={handleAddProject}
      size={"lg"}
    >
      <FeatherIcon icon="plus" size={20} />
      Add Project
    </Button>
  );
};

export default AddProjectButton;
