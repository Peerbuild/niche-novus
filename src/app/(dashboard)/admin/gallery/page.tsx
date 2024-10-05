"use client";
import { getSignature } from "@/app/actions/cloud";
import { deleteImage, getGallery } from "@/app/actions/gallery";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => await getGallery(),
  });
  const mutation = useMutation({
    mutationFn: async (imageUrl: string) => await deleteImage(imageUrl),
    onMutate: async (imageUrl: string) => {
      queryClient.setQueryData(
        ["gallery"],
        (prev: Record<string, string>[]) => {
          return prev?.filter(
            (image: Record<string, string>) => image.secure_url !== imageUrl
          );
        }
      );
    },
    onSuccess: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });

  const [progress, setProgress] = useState<number>(0);
  const [image, setImage] = useState<string>("");

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const url = URL.createObjectURL(file);
    setImage(url);

    const { timestamp, signature } = await getSignature();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp.toString());
    formData.append("folder", "nichenovus");

    const endpoint = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    const res = await axios.post(endpoint, formData, {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable && progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      },
    });

    await queryClient.invalidateQueries({ queryKey: ["gallery"] });
    setImage("");
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 ">
      <div>
        {image ? (
          <div className="aspect-square rounded-lg overflow-hidden relative">
            <div
              style={{ width: `${100 - progress}%` }}
              className="absolute  h-full right-0 bg-black/50"
            ></div>
            <Image
              src={image}
              width={200}
              height={200}
              className="object-center object-cover w-full h-full"
              alt="image"
            />
          </div>
        ) : (
          <Label
            htmlFor="imageInput"
            className="aspect-square transition-colors cursor-pointer hover:border-white text-white flex justify-center group items-center border border-dashed border-border rounded-lg"
          >
            <div className="border transition-colors border-muted-foreground group-hover:border-white p-1  rounded-full">
              <FeatherIcon
                icon="plus"
                size={18}
                className="group-hover:text-white transition-colors text-muted-foreground"
              />
            </div>
          </Label>
        )}
        <Input
          onChange={handleFileInputChange}
          type="file"
          className="hidden"
          id="imageInput"
          accept="image/*"
        />
      </div>
      {query.data?.map((gallery: Record<string, string>) => {
        return (
          <div
            key={gallery.asset_id}
            className="aspect-square rounded-lg overflow-hidden relative"
          >
            <div
              onClick={() => mutation.mutate(gallery.secure_url)}
              className="group absolute transition-all opacity-0 hover:opacity-100 w-full cursor-pointer h-full bg-black/80 flex justify-center items-center"
            >
              <div className="transition-colors group-hover:text-destructive p-2 rounded-lg">
                <FeatherIcon icon="trash" />
              </div>
            </div>
            <Image
              src={gallery.secure_url}
              width={200}
              height={200}
              className="object-center object-cover w-full h-full"
              alt={gallery.public_id}
            />
          </div>
        );
      })}
    </div>
  );
}
