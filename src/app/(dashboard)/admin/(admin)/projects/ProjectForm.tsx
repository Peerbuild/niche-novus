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
import { cn, createWebpDeliveryUrl, isUploading } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Path, PathValue, useForm, UseFormSetFocus } from "react-hook-form";
import FeatherIcon from "feather-icons-react";
import { Project } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { progress } from "framer-motion";
import { getSignature } from "@/app/actions/cloud";
import { revalidateApp } from "@/app/actions/revalidateApp";
import { useSync } from "@/providers/SyncProvider";
import axios from "axios";

const ProjectForm = ({ project }: { project: Project }) => {
  const queryClient = useQueryClient();
  const [progress, setProgress] = React.useState<Record<string, number>>({});
  const { setSyncing } = useSync();
  const form = useForm<
    z.infer<typeof projectSchema> & { id: string; clientId: string }
  >(
    {
      resolver: zodResolver(projectSchema),
      defaultValues: {
        title: project.title,
        description: project.description,
        primaryVideoUrl: project.primaryVideoUrl,
        secondaryVideoUrl: project.secondaryVideoUrl,
      },
    }
    // ["projects", project.clientId],
    // { id: project.id, clientId: project.clientId },
    // true
  );

  useEffect(() => {
    const onSubmit = async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        form.handleSubmit(async (data) => {
          console.log("submit");
          setSyncing(true);

          const uploadRequests = [];
          const fileKeys = [];

          for (const key in data) {
            if (data[key as keyof typeof data] instanceof File) {
              const file = data[key as keyof typeof data] as File;
              const type = file.type.split("/")[0];

              const { timestamp, signature } = await getSignature({
                shouldTransform: true && type !== "image",
              });

              const formData = new FormData();

              formData.append("file", file);
              formData.append(
                "api_key",
                process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!
              );
              formData.append("signature", signature);
              true &&
                type !== "image" &&
                formData.append("transformation", "w_800");
              formData.append("timestamp", timestamp.toString());
              formData.append("folder", "nichenovus");

              const endpoint = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${type}/upload`;
              uploadRequests.push(
                axios.post(endpoint, formData, {
                  onUploadProgress: (progressEvent) => {
                    if (progressEvent.lengthComputable && progressEvent.total) {
                      const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                      );
                      setProgress((prev) => ({
                        ...prev,
                        [key]: percentCompleted,
                      }));
                    }
                  },
                })
              );

              fileKeys.push(key);
            }
          }

          const results = await Promise.all(uploadRequests);

          for (let i = 0; i < results.length; i++) {
            const { secure_url } = results[i].data;
            data[fileKeys[i] as keyof typeof data] =
              createWebpDeliveryUrl(secure_url);
          }

          await updateProject({
            id: project.id,
            clientId: project.clientId,
            description: data.description,
            primaryVideoUrl: data.primaryVideoUrl || project.primaryVideoUrl,
            secondaryVideoUrl:
              data.secondaryVideoUrl || project.secondaryVideoUrl,
            title: data.title,
          });
          form.reset({
            title: data.title,
            description: data.description,
            primaryVideoUrl: data.primaryVideoUrl || project.primaryVideoUrl,
            secondaryVideoUrl:
              data.secondaryVideoUrl || project.secondaryVideoUrl,
          });
          await queryClient.invalidateQueries({
            queryKey: ["clients"],
          });
          await queryClient.invalidateQueries({
            queryKey: ["projects", { clientId: project.clientId }],
          });
          await revalidateApp();
          setSyncing(false);
        })();
      }
    };

    if (form.formState.isDirty && form.formState.isValid) {
      document.addEventListener("keydown", onSubmit);
    }

    return () => {
      document.removeEventListener("keydown", onSubmit);
    };
  }, [form, form.formState, queryClient]);

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
                <div
                  className={cn(
                    "text-sm flex gap-2 text-muted-foreground  -translate-y-14 transition-transform w-fit mx-auto  relative z-0 ",
                    form.formState.isValid &&
                      form.formState.isDirty &&
                      "-translate-y-4"
                  )}
                >
                  Press <FeatherIcon icon="corner-down-left" size={14} /> to
                  save
                </div>
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
