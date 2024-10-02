import { createWork } from "@/app/actions/work";
import { Button } from "@/components/ui/button";
import { workSchema } from "@/lib/schema";
import { Work } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FeatherIcon from "feather-icons-react";
import React from "react";
import { z } from "zod";

const AddWorkButton = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (newWork: z.infer<typeof workSchema>) =>
      await createWork(newWork),

    onMutate: () => {
      const newWork = {
        id: "new",
        title: "New Work",
        description: "Description",
        videoUrl: "www.youtube.com",
      };
      queryClient.setQueryData<Work[]>(["works"], (prev) => {
        if (prev === undefined) return [newWork];
        return [...prev, newWork];
      });
    },

    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["works"],
      });
    },

    mutationKey: ["addWork"],
  });

  return (
    <Button
      size={"lg"}
      onClick={() =>
        mutation.mutate({
          title: "New Work",
          description: "Description",
        })
      }
      className="gap-2"
    >
      <FeatherIcon icon="plus" size={18} />
      Add Project
    </Button>
  );
};

export default AddWorkButton;
