"use client";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon } from "lucide-react";
import React from "react";

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

const Draggable = ({ id, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="flex" ref={setNodeRef} style={style}>
      <Button
        variant={"link"}
        className="pt-8 text-muted-foreground"
        size={"icon"}
        {...listeners}
        {...attributes}
      >
        <GripVerticalIcon size={18} />
      </Button>
      {children}
    </div>
  );
};

export default Draggable;
