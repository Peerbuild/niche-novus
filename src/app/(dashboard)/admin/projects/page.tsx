import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProjectForm from "./ProjectForm";

const mockedData = [
  {
    name: "Client 1",
    Project: [
      {
        name: "Project 1",
        description: "Description 1",
      },
      {
        name: "Project 2",
        description: "Description 2",
      },
    ],
  },
  {
    name: "Client 2",
    Project: [
      {
        name: "Project 3",
        description: "Description 3",
      },
      {
        name: "Project 4",
        description: "Description 4",
      },
    ],
  },
];

export default function Page() {
  return (
    <Accordion type="single" collapsible className="max-w-screen-md">
      {mockedData.map((client) => {
        return (
          <AccordionItem value={client.name} key={client.name}>
            <AccordionTrigger>{client.name}</AccordionTrigger>
            <AccordionContent>
              {client.Project.map((project) => {
                return <ProjectForm key={project.name} project={project} />;
              })}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
