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

export default function Page() {
  const query = useQuery({
    queryKey: ["works"],
    queryFn: async () => await getWorks(),
  });

  return (
    <div className="text-center max-w-screen-md">
      <Accordion type="single" collapsible>
        {query.data?.map((work) => {
          return (
            <AccordionItem key={work.id} value={work.id}>
              <AccordionTrigger className="gap-4">
                <div className="flex justify-between items-center w-full">
                  <h2 className="uppercase">{work.title}</h2>
                  <RemoveWorkButton workId={work.id} />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <WorksForm work={work} />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <AddWorkButton />
    </div>
  );
}
