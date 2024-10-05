"use client";
import { capitalize, cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { UseFormRegister } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

type VideoInputProps = {
  name: string;
  subtitle: string;
  fieldName: string;
  register: UseFormRegister<any>;
  videoUrl: string;
  aspectRatio?: number;
  uploadProgress: number;
};

export const VideoInput = ({
  name,
  subtitle,
  fieldName,
  register,
  videoUrl,
  aspectRatio,
  uploadProgress,
}: VideoInputProps) => {
  const [video, setVideo] = React.useState<string>(videoUrl || "");

  useEffect(() => {
    setVideo(videoUrl);
  }, [videoUrl]);

  const fileRef = register(fieldName);

  return (
    <div className="flex text-left gap-24 items-center max-w-xl">
      <div className="space-y-2">
        <div className="text-xl">{capitalize(name)}</div>
        <div className="text-muted-foreground">{subtitle}</div>
      </div>
      <FormField
        name={fieldName}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel
                style={{ aspectRatio }}
                className={cn(
                  "w-16 block  rounded-lg relative bg-muted overflow-hidden outline-1  outline-dashed outline-border",
                  aspectRatio === 16 / 9 && "w-32"
                )}
              >
                <div
                  className="bg-black/50 absolute right-0  h-full top-0"
                  style={{ width: `${100 - uploadProgress}%` }}
                ></div>
                <video src={video} className="w-full h-full"></video>
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  {...fileRef}
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setVideo(URL.createObjectURL(e.target.files?.[0]));
                    }
                    field.onChange(e.target.files?.[0] ?? undefined);
                  }}
                />
              </FormControl>
            </FormItem>
          );
        }}
      />
    </div>
  );
};
