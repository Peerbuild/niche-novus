"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import ClientContent from "./ClientContent";
import AddClientButton from "./AddClientButton";
import { useMutationState, useQuery } from "@tanstack/react-query";
import { getClients } from "@/app/actions/client";
import { Project, Client } from "@prisma/client";
import { ClientWithProjects } from "@/lib/types";

export default function Page() {
  const query = useQuery({
    queryKey: ["clients"],
    queryFn: async () => await getClients(),
  });
  const variables = useMutationState<ClientWithProjects>({
    filters: { mutationKey: ["addClient"], status: "pending" },
    select: (mutation) => mutation.state.variables as ClientWithProjects,
  });
  console.log(query.data);
  return (
    <div className="text-center max-w-screen-md">
      <Accordion type="single" collapsible>
        {query.data?.map((client, i) => {
          return (
            <AccordionItem value={client.name} key={client.name}>
              <AccordionTrigger>{client.name}</AccordionTrigger>
              <AccordionContent className="text-center">
                <ClientContent
                  initialProjects={client.Project}
                  clientName={client.name}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
        {variables.map((client: ClientWithProjects) => {
          return (
            <AccordionItem value={client.name} key={client.name}>
              <AccordionTrigger>{client.name}</AccordionTrigger>
              <AccordionContent className="text-center">
                <ClientContent
                  initialProjects={client.Project}
                  clientName={client.name}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      <AddClientButton />
    </div>
  );
}
