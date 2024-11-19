import { createWork } from "@/app/actions/work";
import { Button } from "@/components/ui/button";
import { workSchema } from "@/lib/schema";
import { Work } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FeatherIcon from "feather-icons-react";
import React, { Dispatch, SetStateAction } from "react";
import { z } from "zod";

const AddWorkButton = ({
  setWorks,
}: {
  setWorks: Dispatch<SetStateAction<Work[]>>;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (newWork: Work) => await createWork(newWork),

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

  const handleAddWork = async () => {
    // const newWork = await createWork({
    //   id: "",
    //   title: "New Work",
    //   description: "Description",
    //   videoUrl: "",
    // });

    setWorks((prev) => {
      return [
        ...prev,
        {
          id: "",
          title: "New Work",
          description: "Description",
          videoUrl: "",
        },
      ];
    });
  };

  return (
    <Button size={"lg"} onClick={handleAddWork} className="gap-2">
      <FeatherIcon icon="plus" size={18} />
      Add Project
    </Button>
  );
};

export default AddWorkButton;
