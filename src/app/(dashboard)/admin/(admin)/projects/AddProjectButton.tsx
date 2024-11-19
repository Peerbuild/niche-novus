"use client";
import { updateProject } from "@/app/actions/project";
import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FeatherIcon from "feather-icons-react";
import { Dispatch, SetStateAction } from "react";

const AddProjectButton = ({
  clientId,
  setProjects,
}: {
  clientId: string;
  setProjects: Dispatch<SetStateAction<Project[]>>;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (newProject: Project) => await updateProject(newProject),
    onMutate: async (newProject: Project) => {
      queryClient.setQueryData<Project[]>(
        ["projects", { clientId }],
        (prev) => {
          if (prev === undefined) return [newProject];
          return [...prev, newProject];
        }
      );
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["projects", { clientId }],
      });
    },
    mutationKey: ["addProject"],
  });

  const handleAddProject = async () => {
    setProjects((prev) => [
      ...prev,
      {
        id: "",
        title: "New Project",
        description: "",
        primaryVideoUrl: "",
        secondaryVideoUrl: "",
        clientId,
      },
    ]);
    const newProject = await updateProject({
      id: "",
      title: "New Project",
      description: "",
      primaryVideoUrl: "",
      secondaryVideoUrl: "",
      clientId,
    });
    setProjects((prev) => {
      return prev.toSpliced(
        prev.findIndex((project) => project.id === ""),
        1,
        newProject
      );
    });
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
