"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useLenis } from "@studio-freight/react-lenis";
import Image from "next/image";
import React from "react";

const navLinks = [
  {
    label: "about",
    href: "#about",
  },
  {
    label: "work",
    href: "#work",
  },
  {
    label: "projects",
    href: "#projects",
  },
];

const Header = () => {
  const lenis = useLenis();
  return (
    <header
      className={cn(
        "mt-16 left-1/2 md:-translate-y-0 duration-500 text-lg -translate-x-1/2  z-40 absolute md:absolute backdrop-blur w-[90vw] bg-background/40 justify-center md:justify-between items-center py-6 px-20 flex  lg:w-full max-w-screen-lg mx-auto transition-all",
        // showNav && "md:translate-y-0",
        true && "bg-background/0 backdrop-blur-none"
      )}
    >
      <ul className="md:contents hidden">
        {navLinks.map((link, i) => {
          if (i > 1) return null;
          return (
            <li
              onClick={() => lenis?.scrollTo(link.href)}
              key={link.label}
              className="content-center"
            >
              <a href={link.href}>{link.label}</a>
            </li>
          );
        })}
      </ul>
      <div>
        <Image
          className="mx-auto "
          src={"/logo.svg"}
          alt="Logo"
          width={15}
          height={35}
        />
      </div>
      <ul className="md:contents hidden">
        {navLinks.map((link, i) => {
          if (i < 2) return null;

          return (
            <li
              onClick={() => lenis?.scrollTo(link.href)}
              key={link.label}
              className="content-center"
            >
              <a href={link.href}>{link.label}</a>
            </li>
          );
        })}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>shop</TooltipTrigger>
            <TooltipContent>
              <p>coming soon</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ul>
    </header>
  );
};

export default Header;
