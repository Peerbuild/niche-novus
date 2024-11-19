import { deleteImage } from "@/app/actions/gallery";
import { FormLabel } from "@/components/ui/form";
import { Gallery } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FeatherIcon from "feather-icons-react";
import image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

const GalleryActions = ({
  image,
  setGallery,
}: {
  image: Gallery;
  setGallery: Dispatch<SetStateAction<Gallery[]>>;
}) => {
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

  const handleDeleteImage = async () => {
    setGallery((prev) =>
      prev.filter((item) => item.imageUrl !== image.imageUrl)
    );
    await deleteImage(image);
  };

  return (
    <div className="group absolute transition-all opacity-0 hover:opacity-100 w-full cursor-pointer h-full bg-black/80 flex justify-center items-center">
      <FormLabel className="border transition-colors border-muted-foreground text-muted-foreground hover:text-foreground hover:border-white p-1  rounded-full">
        <FeatherIcon icon="plus" size={18} />
      </FormLabel>
      <div
        onClick={handleDeleteImage}
        className="transition-colors text-muted-foreground hover:text-destructive p-2 rounded-lg"
      >
        <FeatherIcon icon="trash" />
      </div>
    </div>
  );
};

export default GalleryActions;
