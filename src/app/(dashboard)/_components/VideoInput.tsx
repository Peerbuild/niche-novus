import { capitalize } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import React from "react";
import { Label } from "@/components/ui/label";
import { UseFormSetValue } from "react-hook-form";

type VideoInputProps = {
  name: string;
  subtitle: string;
  fieldName: string;
  setValue: UseFormSetValue<any>;
};

export const VideoInput = ({
  name,
  subtitle,
  fieldName,
  setValue,
}: VideoInputProps) => {
  const [video, setVideo] = React.useState<string>("");
  const handleVideoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    console.log(url.slice(5));
    setValue(fieldName, url.slice(5), { shouldDirty: true });

    setVideo(url);
  };

  return (
    <div className="flex text-left gap-24 items-center max-w-xl">
      <div className="space-y-2">
        <div className="text-xl">{capitalize(name)}</div>
        <div className="text-muted-foreground">{subtitle}</div>
      </div>
      <Input
        type="file"
        accept="video/*"
        className="hidden"
        id={fieldName}
        onChange={handleVideoInput}
      />
      <Label
        htmlFor={fieldName}
        className="w-32 aspect-video rounded-lg bg-muted overflow-hidden outline-1  outline-dashed outline-border"
      >
        <video
          src={video}
          className="w-full h-full"
          muted
          loop
          autoPlay
        ></video>
      </Label>
    </div>
  );
};
