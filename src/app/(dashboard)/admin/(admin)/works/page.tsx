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
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Work } from "@prisma/client";

export default function Page() {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<{
    id: string[];
  }>({
    id: [],
  });
  const [works, setWorks] = useState<Work[]>([]);
  const query = useQuery({
    queryKey: ["works"],
    queryFn: async () => await getWorks(),
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWorks();
      setWorks(data);
    };

    fetchData();
  }, []);

  return (
    <div className="text-center max-w-screen-md">
      <Accordion type="multiple">
        {works.map((work, i) => {
          return (
            <AccordionItem key={work.id} value={work.id + i}>
              <AccordionTrigger
                className="gap-4"
                // disabled={hasUnsavedChanges.id.includes(work.id) ? true : false}
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
                  <RemoveWorkButton setWorks={setWorks} workId={work.id} />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <WorksForm
                  work={work}
                  setWorks={setWorks}
                  setHasUnsavedChanges={setHasUnsavedChanges}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <AddWorkButton setWorks={setWorks} />
    </div>
  );
}
