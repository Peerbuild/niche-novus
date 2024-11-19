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
import { ClientWithProjects } from "@/lib/types";

const ClientContent = ({
  initialProjects,
  clientId,
}: {
  initialProjects: Project[];
  clientId: string;
}) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  // const { data: projects } = useQuery({
  //   queryFn: async () => await getProjects(clientId),
  //   queryKey: ["projects", { clientId }],
  //   initialData: initialProjects,
  // });

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getProjects(clientId);
      setProjects(projects);
    };

    fetchProjects();
  }, [clientId]);

  return (
    <div>
      {projects.map((project) => {
        return (
          <ProjectForm
            setProjects={setProjects}
            key={project.id}
            project={project}
          />
        );
      })}
      <AddProjectButton setProjects={setProjects} clientId={clientId} />
    </div>
  );
};

export const ClientHeader = ({
  client,
  setData,
}: {
  client: Client;
  setData: Dispatch<SetStateAction<ClientWithProjects[]>>;
}) => {
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
        setData={setData}
      />
    </div>
  );
};

export const ClientActionButtons = ({
  renamingState,
  inputRef,
  clientId,
  setData,
}: {
  renamingState: [boolean, Dispatch<SetStateAction<boolean>>];
  inputRef: React.RefObject<HTMLInputElement>;
  clientId: string;
  setData: Dispatch<SetStateAction<ClientWithProjects[]>>;
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

  const handleDeleteClient = async () => {
    setData((prev) => prev.filter((client) => client.id !== clientId));
    await deleteClient(clientId);
  };

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
          handleDeleteClient();
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
