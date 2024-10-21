"use client";
import { updateProject } from "@/app/actions/project";
import { Button } from "@/components/ui/button";
import { projectSchema } from "@/lib/schema";
import { Project } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FeatherIcon from "feather-icons-react";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

const AddProjectButton = ({ clientId }: { clientId: string }) => {
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

  return (
    <Button
      className=" w-fit mx-auto gap-2"
      onClick={() =>
        mutation.mutate({
          id: "",
          clientId,
          description: "",
          title: "New Project",
          primaryVideoUrl: "",
          secondaryVideoUrl: "",
        })
      }
      size={"lg"}
    >
      <FeatherIcon icon="plus" size={20} />
      Add Project
    </Button>
  );
};

export default AddProjectButton;
