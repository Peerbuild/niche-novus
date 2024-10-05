import React from "react";
import SidebarToggle from "./SidebarToggler";

export const Header = () => {
  return (
    <header className="text-xl  border-b-2 border-border py-5 flex justify-between items-center">
      <div>
        Good Evening, <span className="text-accent">Nishad.</span>
      </div>
      <SidebarToggle />
    </header>
  );
};
