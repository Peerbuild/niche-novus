import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import AddProjectButton from "./AddProjectButton";
import ProjectForm from "./ProjectForm";
import { Client, Project } from "@prisma/client";
import { deleteClient, updateClient } from "@/app/actions/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FeatherIcon from "feather-icons-react";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjects } from "@/app/actions/project";
import { revalidateApp } from "@/app/actions/revalidateApp";

const ClientContent = ({
  initialProjects,
  clientId,
}: {
  initialProjects: Project[];
  clientId: string;
}) => {
  const { data: projects } = useQuery({
    queryFn: async () => await getProjects(clientId),
    queryKey: ["projects", { clientId }],
    initialData: initialProjects,
  });

  return (
    <div>
      {projects.map((project) => {
        return <ProjectForm key={project.title} project={project} />;
      })}
      <AddProjectButton clientId={clientId} />
    </div>
  );
};

export const ClientHeader = ({ client }: { client: Client }) => {
  const renamingState = useState(false);
  const queryClient = useQueryClient();
  const [name, setName] = useState(client.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (name === client.name) {
      return;
    }
    const timeout = setTimeout(async () => {
      await revalidateApp();
      await updateClient({
        id: client.id,
        name,
        order: client.order,
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [name, client]);

  return (
    <div className="flex w-full justify-between">
      <Input
        className={cn(
          "bg-transparent w-fit pointer-events-none",
          renamingState[0] && "pointer-events-auto"
        )}
        value={name}
        disabled={!renamingState[0]}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => renamingState[1](false)}
        ref={inputRef}
      />
      <ClientActionButtons
        renamingState={renamingState}
        inputRef={inputRef}
        clientId={client.id}
      />
    </div>
  );
};

export const ClientActionButtons = ({
  renamingState,
  inputRef,
  clientId,
}: {
  renamingState: [boolean, Dispatch<SetStateAction<boolean>>];
  inputRef: React.RefObject<HTMLInputElement>;
  clientId: string;
}) => {
  const queryClient = useQueryClient();
  const [renaming, setRenaming] = renamingState;

  const mutation = useMutation({
    mutationFn: async () => await deleteClient(clientId),
    onMutate: () => {
      queryClient.setQueryData<Client[]>(["clients"], (prev) => {
        if (prev === undefined) return [];
        return prev.filter((client) => client.id !== clientId);
      });
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["clients"] });
    },

    mutationKey: ["removeClient"],
  });

  useEffect(() => {
    if (renaming) {
      inputRef.current?.select();
    }
  }, [renaming, inputRef]);

  return (
    <div className="flex gap-6 items-center text-muted-foreground">
      <Button
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault();
          setRenaming(!renaming);
        }}
        size={"icon"}
      >
        <FeatherIcon icon="edit" size={20} />
      </Button>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          mutation.mutate();
        }}
        variant={"ghost"}
        size={"icon"}
      >
        <FeatherIcon icon="trash-2" size={20} />
      </Button>
    </div>
  );
};

export default ClientContent;
