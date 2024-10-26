"use client";
import React from "react";
import { useSidebar } from "@/providers/SidebarProvider";
import FeatherIcon from "feather-icons-react";

const SidebarToggle = () => {
  const { isOpen, setIsOpen } = useSidebar();
  return (
    <div
      className="md:hidden relative z-30 "
      onClick={() => setIsOpen((isOpen) => !isOpen)}
    >
      <FeatherIcon
        icon={isOpen ? "x" : "menu"}
        className="rotate-180"
        size={20}
      />
    </div>
  );
};

export default SidebarToggle;
