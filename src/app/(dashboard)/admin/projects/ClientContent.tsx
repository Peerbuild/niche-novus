import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import AddProjectButton from "./AddProjectButton";
import ProjectForm from "./ProjectForm";
import { projectSchema } from "@/lib/schema";
import { z } from "zod";
import { Client, Project } from "@prisma/client";
import { updateClient } from "@/app/actions/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FeatherIcon from "feather-icons-react";
import { Input } from "@/components/ui/input";

const ClientContent = ({
  initialProjects,
  clientId,
}: {
  initialProjects: Project[];
  clientId: string;
}) => {
  const [projects, setProjects] = useState(initialProjects);
  return (
    <div>
      {projects.map((project) => {
        return <ProjectForm key={project.title} project={project} />;
      })}
      <AddProjectButton setProjects={setProjects} clientId={clientId} />
    </div>
  );
};

export const ClientHeader = ({ client }: { client: Client }) => {
  const renamingState = useState(false);
  const [name, setName] = useState(client.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateClient({
        id: client.id,
        name,
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [name, client.id]);

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
      <ClientActionButtons renamingState={renamingState} inputRef={inputRef} />
    </div>
  );
};

export const ClientActionButtons = ({
  renamingState,
  inputRef,
}: {
  renamingState: [boolean, Dispatch<SetStateAction<boolean>>];
  inputRef: React.RefObject<HTMLInputElement>;
}) => {
  const [renaming, setRenaming] = renamingState;

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
      <Button variant={"ghost"} size={"icon"}>
        <FeatherIcon icon="trash-2" size={20} />
      </Button>
    </div>
  );
};

export default ClientContent;
