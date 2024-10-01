"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ClientContent, { ClientHeader } from "./ClientContent";
import AddClientButton from "./AddClientButton";
import { useMutationState, useQuery } from "@tanstack/react-query";
import { getClients } from "@/app/actions/client";
import { ClientWithProjects } from "@/lib/types";
import { v4 as uuid } from "uuid";

export default function Page() {
  const query = useQuery({
    queryKey: ["clients"],
    queryFn: async () => await getClients(),
  });
  const variables = useMutationState<ClientWithProjects>({
    filters: { mutationKey: ["addClient", "removeClient"], status: "pending" },
    select: (mutation) => mutation.state.variables as ClientWithProjects,
  });
  console.log(query.data);
  return (
    <div className="text-center max-w-screen-md">
      <Accordion type="single" collapsible>
        {query.data?.map((client, i) => {
          return <ClientAccordion client={client} key={uuid()} />;
        })}
        {variables.map((client: ClientWithProjects) => {
          return <ClientAccordion key={uuid()} client={client} />;
        })}
      </Accordion>
      <AddClientButton />
    </div>
  );
}

const ClientAccordion = ({ client }: { client: ClientWithProjects }) => {
  return (
    <AccordionItem value={uuid()}>
      <AccordionTrigger className="gap-4">
        <ClientHeader client={client} />
      </AccordionTrigger>
      <AccordionContent className="text-center">
        <ClientContent clientId={client.id} initialProjects={client.Project} />
      </AccordionContent>
    </AccordionItem>
  );
};
