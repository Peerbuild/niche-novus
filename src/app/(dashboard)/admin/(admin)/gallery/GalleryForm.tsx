import { updateGallery } from "@/app/actions/gallery";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useAutoSaveForm from "@/hooks/useAutoSaveForm";
import { gallerySchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import GalleryActions from "./GalleryActions";
import { Gallery } from "@prisma/client";
import { cn, isUploading } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { getSignature } from "@/app/actions/cloud";
import axios from "axios";
import { revalidateApp } from "@/app/actions/revalidateApp";
import { useSync } from "@/providers/SyncProvider";

const GalleryForm = ({ item }: { item?: Gallery }) => {
  const queryClient = useQueryClient();
  const { setSyncing } = useSync();
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [image, setImage] = React.useState<string>(item?.imageUrl || "");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const form = useForm({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: item?.title,
      imageUrl: image,
    },
  });
  const fileRef = form.register("imageUrl");

  useEffect(() => {
    if (form.formState.isSubmitSuccessful && form.formState.isDirty && !item) {
      form.setValue("title", "");
      setImage("");
    }
  }, [form.formState.isSubmitSuccessful, form, item]);

  const onSubmit = form.handleSubmit(async (data) => {
    if (!data.title || !image) return;
    setSyncing(true);

    let result: any = { data: { secure_url: image } };
    if (imageFile) {
      const { timestamp, signature } = await getSignature({
        shouldTransform: false,
      });
      const formData = new FormData();

      formData.append("file", imageFile);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp.toString());
      formData.append("folder", "nichenovus");

      const endpoint = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      result = await axios.post(endpoint, formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable && progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress((prev) => ({ ...prev, imageUrl: percentCompleted }));
          }
        },
      });
    }

    await updateGallery({
      title: data.title,
      id: item?.id || "",
      imageUrl: result.data.secure_url,
    });
    form.reset({
      title: item ? data.title : "",
      imageUrl: item ? result.data.secure_url : "",
    });
    setImage(item ? result.data.secure_url : "");
    await queryClient.invalidateQueries({ queryKey: ["gallery"] });
    await revalidateApp();
    setSyncing(false);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          name="imageUrl"
          render={({ field }) => {
            return (
              <FormItem>
                {image ? (
                  <div className="relative rounded-lg overflow-hidden aspect-square">
                    {item && <GalleryActions image={item} />}
                    <div
                      style={{ width: `${100 - progress.imageUrl}%` }}
                      className="absolute  h-full right-0 bg-black/50"
                    ></div>
                    <Image
                      src={image}
                      alt="image"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <FormLabel className="aspect-square relative overflow-hidden transition-colors cursor-pointer hover:border-white text-white flex justify-center group items-center border border-dashed border-border rounded-lg">
                    <div className="border transition-colors border-muted-foreground group-hover:border-white p-1  rounded-full">
                      <FeatherIcon
                        icon="plus"
                        size={18}
                        className="group-hover:text-white transition-colors text-muted-foreground"
                      />
                    </div>
                  </FormLabel>
                )}
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...fileRef}
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setImageFile(e.target.files?.[0]);
                        setImage(URL.createObjectURL(e.target.files?.[0]));
                      }
                      field.onChange(e.target.files?.[0] ?? undefined);
                    }}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          name="title"
          render={({ field }) => {
            return (
              <Input
                placeholder="Untitled"
                disabled={isUploading(progress)}
                {...field}
              />
            );
          }}
        />
        <div
          className={cn(
            "text-sm flex gap-2 text-muted-foreground -translate-y-12 transition-transform w-fit ml-auto -z-10 relative",
            form.formState.isValid && form.formState.isDirty && "-translate-y-2"
          )}
        >
          Press <FeatherIcon icon="corner-down-left" size={14} /> to save
        </div>
      </form>
    </Form>
  );
};

export default GalleryForm;
