import { removeWork } from "@/app/actions/work";
import { Button } from "@/components/ui/button";
import { Work } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FeatherIcon from "feather-icons-react";
import React, { Dispatch, SetStateAction } from "react";

const RemoveWorkButton = ({
  workId,
  setWorks,
}: {
  workId: string;
  setWorks: Dispatch<SetStateAction<Work[]>>;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => await removeWork(workId),
    onMutate: () => {
      queryClient.setQueryData<Work[]>(["works"], (prev) => {
        if (prev === undefined) return [];
        return prev.filter((work) => work.id !== workId);
      });
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["works"],
      });
    },
  });

  const handleDeleteWork = async () => {
    setWorks((prev) => {
      return prev.filter((work) => work.id !== workId);
    });
    await removeWork(workId);
  };
  return (
    <Button size={"icon"} variant={"ghost"} onClick={handleDeleteWork}>
      <FeatherIcon icon="trash-2" size={18} />
    </Button>
  );
};

export default RemoveWorkButton;
