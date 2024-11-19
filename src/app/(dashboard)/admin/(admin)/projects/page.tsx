"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ClientContent, { ClientHeader } from "./ClientContent";
import AddClientButton from "./AddClientButton";
import {
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getClients, updateClientOrder } from "@/app/actions/client";
import { ClientWithProjects } from "@/lib/types";
import { v4 as uuid } from "uuid";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import Draggable from "@/app/(dashboard)/_components/Draggable";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

export default function Page() {
  const queryClient = useQueryClient();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState({
    projectIds: [""],
    clientIds: [""],
  });
  const [data, setData] = useState<ClientWithProjects[]>([]);
  const query = useQuery({
    queryKey: ["clients"],
    queryFn: async () => await getClients(),
  });
  const variables = useMutationState<ClientWithProjects>({
    filters: { mutationKey: ["addClient", "removeClient"], status: "pending" },
    select: (mutation) => mutation.state.variables as ClientWithProjects,
  });
  const clientIds = useMemo(() => data.map((client) => client.id), [data]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;
    const clients = query.data as ClientWithProjects[];
    const activeIndex = clients.findIndex((client) => client.id === active.id);
    const overIndex = clients.findIndex((client) => client.id === over?.id);

    queryClient.setQueryData(["clients"], (prev: ClientWithProjects[]) =>
      arrayMove(prev, activeIndex, overIndex)
    );

    setData((prev) => arrayMove(prev, activeIndex, overIndex));

    await updateClientOrder({
      id: clientIds[activeIndex],
      oldIndex: activeIndex,
      newIndex: overIndex,
    });
  };

  useEffect(() => {
    console.log(query.data);
    if (query.data) setData(query.data);
  }, [query.data, data]);

  if (!query.data) return null;

  return (
    <div className="text-center max-w-screen-md">
      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={clientIds || []}
          strategy={verticalListSortingStrategy}
        >
          <Accordion type="single" collapsible>
            {data.map((client, i) => {
              return (
                <Draggable key={client.id} id={client.id}>
                  <ClientAccordion
                    hasUnsavedChanges={hasUnsavedChanges}
                    client={client}
                    setHasUnsavedChanges={setHasUnsavedChanges}
                  />
                </Draggable>
              );
            })}
            {variables.map((client: ClientWithProjects) => {
              return (
                <ClientAccordion
                  hasUnsavedChanges={hasUnsavedChanges}
                  key={uuid()}
                  client={client}
                  setHasUnsavedChanges={setHasUnsavedChanges}
                />
              );
            })}
          </Accordion>
        </SortableContext>
      </DndContext>
      <AddClientButton />
    </div>
  );
}

const ClientAccordion = ({
  client,
  hasUnsavedChanges,
  setHasUnsavedChanges,
}: {
  client: ClientWithProjects;
  hasUnsavedChanges: {
    projectIds: string[];
    clientIds: string[];
  };
  setHasUnsavedChanges: Dispatch<
    SetStateAction<{ projectIds: string[]; clientIds: string[] }>
  >;
}) => {
  return (
    <AccordionItem value={uuid()} className="flex-1">
      <AccordionTrigger className="gap-4">
        <ClientHeader client={client} />
      </AccordionTrigger>
      <AccordionContent className="text-center">
        <ClientContent
          hasUnsavedChanges={hasUnsavedChanges}
          setHasUnsavedChanges={setHasUnsavedChanges}
          clientId={client.id}
          initialProjects={client.Project}
        />
      </AccordionContent>
    </AccordionItem>
  );
};
