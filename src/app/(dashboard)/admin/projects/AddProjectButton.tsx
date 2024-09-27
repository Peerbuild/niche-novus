"use client";
import { Button } from "@/components/ui/button";
import { projectSchema } from "@/lib/schema";
import FeatherIcon from "feather-icons-react";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

const AddProjectButton = ({
  setProjects,
}: {
  setProjects: Dispatch<SetStateAction<z.infer<typeof projectSchema>[]>>;
}) => {
  const handleAddProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        title: "New Project",
        description: "Description",
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
