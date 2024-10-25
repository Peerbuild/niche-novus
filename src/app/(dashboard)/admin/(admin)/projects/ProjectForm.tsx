"use client";
import useAutoSaveForm from "@/hooks/useAutoSaveForm";
import { projectSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { z } from "zod";
import { TextInput, VideoInput } from "../../../_components";
import { deleteProject, updateProject } from "@/app/actions/project";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn, isUploading } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseFormSetFocus } from "react-hook-form";
import FeatherIcon from "feather-icons-react";
import { Project } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ProjectForm = ({ project }: { project: Project }) => {
  console.log(project.primaryVideoUrl);
  const { form, progress } = useAutoSaveForm<
    z.infer<typeof projectSchema> & { id: string; clientId: string }
  >(
    updateProject,
    {
      resolver: zodResolver(projectSchema),
      defaultValues: {
        title: project.title,
        description: project.description,
        primaryVideoUrl: project.primaryVideoUrl,
        secondaryVideoUrl: project.secondaryVideoUrl,
      },
    },
    ["projects", project.clientId],
    { id: project.id, clientId: project.clientId },
    true
  );

  return (
    <div className="py-4">
      <Form {...form}>
        <form className=" bg-card rounded-xl">
          <Accordion className="px-8 " type="single" collapsible>
            <AccordionItem value={project.title}>
              <AccordionTrigger className="gap-8 py-5">
                <ProjectHeader
                  setFocus={form.setFocus}
                  uploadProgress={progress}
                  project={project}
                />
              </AccordionTrigger>
              <AccordionContent className="py-8 border-t-2 border-border space-y-10">
                <VideoInput
                  name="Primary Media"
                  subtitle="Size Limit: 25mb"
                  fieldName="primaryVideoUrl"
                  register={form.register}
                  videoUrl={project.primaryVideoUrl}
                  uploadProgress={progress["primaryVideoUrl"]}
                  aspectRatio={16 / 9}
                />
                <VideoInput
                  name="Secondary Media"
                  subtitle="Size Limit: 25mb"
                  fieldName="secondaryVideoUrl"
                  register={form.register}
                  videoUrl={project.secondaryVideoUrl}
                  uploadProgress={progress["secondaryVideoUrl"]}
                  aspectRatio={16 / 9}
                />
                <TextInput
                  name="description"
                  subtitle="Edit personal info"
                  fields={[{ description: "textarea" }]}
                  uploadProgress={progress}
                  maxLimit={{ description: 150 }}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </Form>
    </div>
  );
};

const ProjectHeader = ({
  setFocus,
  project,
  uploadProgress,
}: {
  setFocus: UseFormSetFocus<z.infer<typeof projectSchema>>;
  project: Project;
  uploadProgress: Record<string, number>;
}) => {
  const renamingState = React.useState(false);
  return (
    <div className="flex w-full justify-between items-center">
      <div className="">
        <FormField
          name="title"
          render={({ field: { onBlur, ...field } }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={!renamingState[0] || isUploading(uploadProgress)}
                    className={cn(
                      "bg-transparent text-lg focus-visible:ring-0 p-0 pointer-events-none",
                      renamingState[0] && "pointer-events-auto"
                    )}
                    {...field}
                    onBlur={() => renamingState[1](false)}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        ></FormField>
      </div>
      <ProjectControls
        renamingState={renamingState}
        setFocus={setFocus}
        project={project}
      />
    </div>
  );
};

const ProjectControls = ({
  renamingState,
  setFocus,
  project,
}: {
  renamingState: [boolean, Dispatch<SetStateAction<boolean>>];
  setFocus: UseFormSetFocus<z.infer<typeof projectSchema>>;
  project: Project;
}) => {
  const projectId = project.id;
  const [renaming, setRenaming] = renamingState;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => await deleteProject(projectId),
    onMutate: () => {
      queryClient.setQueryData<Project[]>(
        ["projects", { clientId: project.clientId }],
        (prev) => {
          if (prev === undefined) return [];
          return prev.filter((project) => project.id !== projectId);
        }
      );
    },

    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["projects", { clientId: project.clientId }],
      });
    },
    mutationKey: ["removeProject"],
  });

  useEffect(() => {
    if (renaming) {
      setFocus("title", { shouldSelect: true });
    }
  }, [renaming, setFocus]);

  return (
    <div className="flex gap-6 items-center text-muted-foreground">
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.stopPropagation();
          setRenaming(!renaming);
        }}
        type="button"
        size={"icon"}
      >
        <FeatherIcon icon="edit" size={20} />
      </Button>
      <Button
        onClick={async (e) => {
          e.stopPropagation();
          mutation.mutate();
        }}
        variant={"ghost"}
        size={"icon"}
        type="button"
      >
        <FeatherIcon icon="trash-2" size={20} />
      </Button>
    </div>
  );
};

export default ProjectForm;
