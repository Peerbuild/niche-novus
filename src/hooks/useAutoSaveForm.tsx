"use client";
import axios from "axios";
import { getSignature } from "@/app/actions/cloud";
import { ActionResponse } from "@/lib/ActionResponse";
import { useEffect, useMemo, useState } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  useForm,
  UseFormProps,
  useWatch,
} from "react-hook-form";
import { createWebpDeliveryUrl, isUploading } from "@/lib/utils";
import { useSync } from "@/providers/SyncProvider";
import { useQueryClient } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import { revalidateApp } from "@/app/actions/revalidateApp";

const DEBOUNCE_TIME = 500;

export default function useAutoSaveForm<T extends FieldValues>(
  submitAction: (values: any) => Promise<ActionResponse>,
  options: UseFormProps<T>,
  queryKey: string[],
  variables?: any,
  shouldTransform: boolean = false
) {
  const queryClient = useQueryClient();
  const { setSyncing } = useSync();
  const form = useForm<T>(options);
  const [progress, setProgress] = useState<Record<string, number>>({});

  const watchValues = useWatch({ control: form.control });
  const isDirty = form.formState.isDirty;

  console.log("error", form.formState.errors);

  useEffect(() => {
    async function onSubmit(values: T) {
      if (!isDirty || isUploading(progress)) {
        return;
      }

      setSyncing(true);

      const uploadRequests = [];
      const fileKeys = [];

      for (const key in values) {
        console.log("Values", typeof values[key]);
        if (typeof values[key] === "object") {
          const file = values[key] as File;
          const type = file.type.split("/")[0];

          const { timestamp, signature } = await getSignature({
            shouldTransform: shouldTransform && type !== "image",
          });

          const formData = new FormData();

          formData.append("file", file);
          formData.append(
            "api_key",
            process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!
          );
          formData.append("signature", signature);
          shouldTransform &&
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
                  setProgress((prev) => ({ ...prev, [key]: percentCompleted }));
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
        values[fileKeys[i] as keyof T] = shouldTransform
          ? createWebpDeliveryUrl(secure_url)
          : (secure_url as any);
        form.resetField(fileKeys[i] as any as Path<T>, {
          defaultValue: shouldTransform
            ? (createWebpDeliveryUrl(secure_url) as PathValue<T, Path<T>>)
            : (secure_url as PathValue<T, Path<T>>),
        });
      }

      console.log("Submit", values);

      await submitAction({ ...values, ...variables });
      await queryClient.invalidateQueries({ queryKey });
      await revalidateApp();
      setSyncing(false);
    }

    const timeout = setTimeout(() => {
      form.handleSubmit(onSubmit)();
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(timeout);
    };
  }, [watchValues, form, submitAction, isDirty]);

  return { form, progress };
}
