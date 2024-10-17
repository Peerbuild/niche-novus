import { deleteImage } from "@/app/actions/gallery";
import { FormLabel } from "@/components/ui/form";
import { Gallery } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FeatherIcon from "feather-icons-react";
import image from "next/image";
import React from "react";

const GalleryActions = ({ image }: { image: Gallery }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (image: Gallery) => await deleteImage(image),
    onMutate: async (image: Gallery) => {
      queryClient.setQueryData(["gallery"], (prev: Gallery[]) => {
        return prev?.filter(
          (item: Gallery) => item.imageUrl !== image.imageUrl
        );
      });
    },
    onSuccess: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });

  return (
    <div className="group absolute transition-all opacity-0 hover:opacity-100 w-full cursor-pointer h-full bg-black/80 flex justify-center items-center">
      <FormLabel className="border transition-colors border-muted-foreground text-muted-foreground hover:text-foreground hover:border-white p-1  rounded-full">
        <FeatherIcon icon="plus" size={18} />
      </FormLabel>
      <div
        onClick={() => mutation.mutate(image)}
        className="transition-colors text-muted-foreground hover:text-destructive p-2 rounded-lg"
      >
        <FeatherIcon icon="trash" />
      </div>
    </div>
  );
};

export default GalleryActions;
