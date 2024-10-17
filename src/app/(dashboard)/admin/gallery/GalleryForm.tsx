import { updateGallery } from "@/app/actions/gallery";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import useAutoSaveForm from "@/hooks/useAutoSaveForm";
import { gallerySchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import GalleryActions from "./GalleryActions";
import { Gallery } from "@prisma/client";
import { isUploading } from "@/lib/utils";

const GalleryForm = ({ item }: { item?: Gallery }) => {
  const queryClient = useQueryClient();
  const [image, setImage] = React.useState<string>(item?.imageUrl || "");
  const { form, progress } = useAutoSaveForm(
    updateGallery,
    {
      resolver: zodResolver(gallerySchema),
      defaultValues: {
        title: item?.title,
        imageUrl: image,
      },
    },
    { id: item?.id || "" }
  );
  const fileRef = form.register("imageUrl");

  useEffect(() => {
    if (form.formState.isSubmitSuccessful && form.formState.isDirty) {
      form.setValue("title", "");
      setImage("");
      queryClient.invalidateQueries({
        queryKey: ["gallery"],
      });
    }
  }, [form.formState.isSubmitSuccessful, form, queryClient]);

  return (
    <Form {...form}>
      <form className="space-y-4">
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
      </form>
    </Form>
  );
};

export default GalleryForm;
