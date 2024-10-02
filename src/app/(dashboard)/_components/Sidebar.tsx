"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Projects",
    link: "/projects",
  },
  {
    name: "Works",
    link: "/works",
  },
];

export const Sidebar = () => {
  const path = usePathname();

  return (
    <div className="bg-neutral-900 rounded-xl m-4 w-[16rem] px-8 py-10 space-y-14">
      <div className="space-y-4 text-md">
        <Image
          className="mx-auto"
          src={"/logo.svg"}
          alt="Logo"
          width={24}
          height={24}
        />
        <div className="space-x-2 text-center">
          <span className="size-2 bg-accent inline-block rounded-full"></span>
          <span className="text-muted-foreground">nichenovus.in</span>
        </div>
      </div>
      <nav>
        <ul className="space-y-10">
          {links.map((link) => (
            <li key={link.name} className="relative">
              {"/admin" + link.link === path && (
                <motion.span
                  layoutId="sidebar-active"
                  className="bg-accent absolute -left-3 top-1 h-4 w-1 inline-block rounded-full"
                ></motion.span>
              )}
              <Link
                className={cn(
                  "text-lg text-muted-foreground transition-colors",
                  "/admin" + link.link === path && "text-accent"
                )}
                href={"/admin" + link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
