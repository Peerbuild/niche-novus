import { Form } from "@/components/ui/form";
import { Work } from "@prisma/client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { TextInput, VideoInput } from "../../../_components";
import useAutoSaveForm from "@/hooks/useAutoSaveForm";
import { workSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createWork, getWorks, updateWork } from "@/app/actions/work";
import { progress } from "framer-motion";
import { Path, PathValue, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { getSignature } from "@/app/actions/cloud";
import { revalidateApp } from "@/app/actions/revalidateApp";
import { cn, createWebpDeliveryUrl } from "@/lib/utils";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useSync } from "@/providers/SyncProvider";
import FeatherIcon from "feather-icons-react";

const WorksForm = ({
  work,
  setWorks,
  setHasUnsavedChanges,
}: {
  work: Work;
  setWorks: Dispatch<SetStateAction<Work[]>>;
  setHasUnsavedChanges: Dispatch<
    SetStateAction<{
      id: string[];
    }>
  >;
}) => {
  const queryClient = useQueryClient();
  const [progress, setProgress] = React.useState<Record<string, number>>({});
  const { setSyncing } = useSync();
  const form = useForm<z.infer<typeof workSchema> & { id: string }>(
    {
      resolver: zodResolver(workSchema),
      defaultValues: {
        title: work.title,
        description: work.description,
        videoUrl: work.videoUrl,
      },
    }
    // ["works"],
    // { id: work.id }
  );

  useEffect(() => {
    const onSubmit = async (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "Enter") {
        form.handleSubmit(async (data) => {
          setSyncing(true);

          const file = data.videoUrl;
          let result: any = { data: { secure_url: work.videoUrl } };
          if (file instanceof File) {
            const type = file.type.split("/")[0];

            const { timestamp, signature } = await getSignature({
              shouldTransform: false && type !== "image",
            });

            const formData = new FormData();

            formData.append("file", file);
            formData.append(
              "api_key",
              process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!
            );
            formData.append("signature", signature);
            false &&
              type !== "image" &&
              formData.append("transformation", "w_800");
            formData.append("timestamp", timestamp.toString());
            formData.append("folder", "nichenovus");

            const endpoint = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${type}/upload`;
            result = await axios.post(endpoint, formData, {
              onUploadProgress: (progressEvent) => {
                if (progressEvent.lengthComputable && progressEvent.total) {
                  const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );
                  setProgress((prev) => ({
                    ...prev,
                    videoUrl: percentCompleted,
                  }));
                }
              },
            });
          }
          if (work.id) {
            const updatedWork = await updateWork({
              description: data.description,
              id: work.id,
              title: data.title,
              videoUrl: result.data.secure_url,
            });
            setWorks((prev) => {
              return prev.toSpliced(
                prev.findIndex((w) => w.id === work.id),
                1,
                updatedWork
              );
            });
          } else {
            await createWork({
              id: "",
              description: data.description,
              title: data.title,
              videoUrl: result.data.secure_url,
            });
            const works = await getWorks();
            setWorks(works);
          }
          form.reset({
            title: data.title,
            description: data.description,
            videoUrl: result.data.secure_url,
          });
          await queryClient.invalidateQueries({
            queryKey: ["works"],
            refetchType: "all",
          });
          await revalidateApp();
          setSyncing(false);
          setHasUnsavedChanges((prev) => {
            return {
              id: prev.id.filter((id) => id !== work.id),
            };
          });
        })();
      }
    };

    if (form.formState.isDirty && form.formState.isValid) {
      setHasUnsavedChanges((prev) => {
        if (!prev.id.includes(work.id)) {
          return {
            id: [...prev.id, work.id],
          };
        } else {
          return prev;
        }
      });
      document.addEventListener("keydown", onSubmit);
    } else {
      setHasUnsavedChanges((prev) => {
        if (prev.id.includes(work.id)) {
          return {
            id: prev.id.filter((id) => id !== work.id),
          };
        } else {
          return prev;
        }
      });
    }

    return () => {
      document.removeEventListener("keydown", onSubmit);
    };
  }, [form, form.formState, work.id, queryClient]);

  return (
    <div>
      <Form {...form}>
        <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
          <VideoInput
            name="Video"
            subtitle="Size Limit:2.5mb"
            fieldName="videoUrl"
            register={form.register}
            uploadProgress={progress["videoUrl"]}
            aspectRatio={9 / 16}
            videoUrl={work.videoUrl}
          />
          <TextInput
            name="Description"
            subtitle="Edit personal info"
            fields={[{ title: "input" }, { description: "textarea" }]}
            uploadProgress={progress}
            maxLimit={{ title: 50, description: 150 }}
          />
          <div
            className={cn(
              "text-sm flex gap-2 text-muted-foreground -translate-y-14 transition-transform w-fit mx-auto  -z-10 relative",
              form.formState.isValid &&
                form.formState.isDirty &&
                "-translate-y-6"
            )}
          >
            Press <FeatherIcon icon="corner-down-left" size={14} /> to save
          </div>
        </form>
      </Form>
    </div>
  );
};

export default WorksForm;
