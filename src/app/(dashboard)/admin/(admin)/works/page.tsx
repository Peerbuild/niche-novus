"use client";

import { getWorks } from "@/app/actions/work";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import WorksForm from "./WorksForm";
import AddWorkButton from "./AddWorkButton";
import RemoveWorkButton from "./RemoveWorkButton";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Page() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState({
    id: [""],
  });
  const query = useQuery({
    queryKey: ["works"],
    queryFn: async () => await getWorks(),
  });

  return (
    <div className="text-center max-w-screen-md">
      <Accordion type="multiple">
        {query.data?.map((work) => {
          return (
            <AccordionItem key={work.id} value={work.id}>
              <AccordionTrigger
                className="gap-4"
                disabled={hasUnsavedChanges.id.includes(work.id) ? true : false}
              >
                <div className="flex justify-between items-center w-full">
                  <h2
                    className={cn(
                      "uppercase",
                      hasUnsavedChanges.id.includes(work.id) &&
                        "text-destructive"
                    )}
                  >
                    {work.title}
                  </h2>
                  <RemoveWorkButton workId={work.id} />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <WorksForm
                  work={work}
                  setHasUnsavedChanges={setHasUnsavedChanges}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <AddWorkButton />
    </div>
  );
}
