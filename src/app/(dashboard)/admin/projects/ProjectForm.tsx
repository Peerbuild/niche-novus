"use client";
import useAutoSaveForm from "@/hooks/useAutoSaveForm";
import { projectSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { set, z } from "zod";
import TextInput from "../../_components/TextInput";
import { updateProject } from "@/app/actions/project";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { capitalize, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseFormSetFocus } from "react-hook-form";
import FeatherIcon from "feather-icons-react";

const ProjectForm = ({
  project,
}: {
  project: z.infer<typeof projectSchema>;
}) => {
  const form = useAutoSaveForm<z.infer<typeof projectSchema>>(updateProject, {
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
    },
  });

  return (
    <div className="py-4">
      <Form {...form}>
        <form className="space-y-0 bg-neutral-900 rounded-xl">
          <Accordion className="px-8 " type="single" collapsible>
            <AccordionItem value={project.name} className="">
              <AccordionTrigger className="gap-8 py-5  ">
                <ProjectHeader setFocus={form.setFocus} />
              </AccordionTrigger>
              <AccordionContent className="py-8 border-t-2 border-border">
                <TextInput
                  name="description"
                  subtitle="Edit personal info"
                  fields={[{ description: "textarea" }]}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>
      </Form>
    </div>
  );
};

const ProjectHeader = ({
  setFocus,
}: {
  setFocus: UseFormSetFocus<z.infer<typeof projectSchema>>;
}) => {
  const renamingState = React.useState(false);
  return (
    <div className="flex w-full justify-between items-center">
      <div className="">
        <FormField
          name="name"
          render={({ field: { onBlur, ...field } }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    onClick={(e) => e.stopPropagation()}
                    disabled={!renamingState[0]}
                    className={cn(
                      "bg-transparent text-lg focus-visible:ring-0 p-0 pointer-events-none",
                      renamingState[0] && "pointer-events-auto"
                    )}
                    {...field}
                    onBlur={() => renamingState[1](false)}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        ></FormField>
      </div>
      <ProjectControls renamingState={renamingState} setFocus={setFocus} />
    </div>
  );
};

const ProjectControls = ({
  renamingState,
  setFocus,
}: {
  renamingState: [boolean, Dispatch<SetStateAction<boolean>>];
  setFocus: UseFormSetFocus<z.infer<typeof projectSchema>>;
}) => {
  const [renaming, setRenaming] = renamingState;

  useEffect(() => {
    if (renaming) {
      setFocus("name", { shouldSelect: true });
    }
  }, [renaming, setFocus]);
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

export default ProjectForm;
