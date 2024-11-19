"use client";
import { getClients, updateClient } from "@/app/actions/client";
import { Button } from "@/components/ui/button";
import { ClientWithProjects } from "@/lib/types";
import { Client, Project } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FeatherIcon from "feather-icons-react";
import { Dispatch, SetStateAction } from "react";

const AddClientButton = ({
  setData,
}: {
  setData: Dispatch<SetStateAction<ClientWithProjects[]>>;
}) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (newClient: { Project: Project[] } & Client) =>
      await updateClient(newClient),
    onMutate: () => {
      queryClient.setQueryData<ClientWithProjects[]>(["clients"], (prev) => {
        if (prev === undefined)
          return [{ id: "", name: "New Client", Project: [], order: -1 }];
        return [
          ...prev,
          { id: "", name: "New Client", Project: [], order: -1 },
        ];
      });
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["clients"] });
    },

    mutationKey: ["addClient"],
  });
  const handleAddClient = async () => {
    setData((prev) => [
      ...prev,
      { id: "", name: "New Client", Project: [], order: -1 },
    ]);
    const newClient = await updateClient({
      id: "",
      name: "New Client",
      order: -1,
    });
    setData((prev) => {
      return prev.toSpliced(
        prev.findIndex((client) => client.id === ""),
        1,
        newClient
      );
    });
  };
  return (
    <Button
      className=" w-fit mx-auto gap-2"
      onClick={handleAddClient}
      size={"lg"}
    >
      <FeatherIcon icon="plus" size={20} />
      Add Client
    </Button>
  );
};

export default AddClientButton;
