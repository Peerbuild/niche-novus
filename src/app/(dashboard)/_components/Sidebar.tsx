"use client";
import { getUsageLimits } from "@/app/actions/cloud";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/providers/SidebarProvider";
import { useSync } from "@/providers/SyncProvider";
import { useQuery } from "@tanstack/react-query";
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
    name: "Works",
    link: "/projects",
  },
  {
    name: "Projects",
    link: "/works",
  },
  {
    name: "Gallery",
    link: "/gallery",
  },
  {
    name: "Emails",
    link: "/contacts",
  },
];

export const Sidebar = () => {
  const path = usePathname();
  const { isOpen } = useSidebar();
  const { syncing } = useSync();
  const query = useQuery({
    queryKey: ["usage"],
    queryFn: async () => await getUsageLimits(),
  });

  return (
    <div
      className={cn(
        "bg-card flex flex-col absolute md:fixed  md:top-0 z-20 w-0 translate-x-[110%] transition-transform md:translate-x-0  h-[97svh]  rounded-xl m-4  overflow-hidden md:w-[16rem] md:px-8 py-10 space-y-14",
        isOpen && "translate-x-3 w-[16rem] px-8"
      )}
    >
      <div className="space-y-4 text-md">
        <Image
          className="mx-auto"
          src={"/logo.svg"}
          alt="Logo"
          width={24}
          height={24}
        />
        <div className="space-x-2 text-center">
          <span
            className={cn(
              "size-2 bg-accent inline-block rounded-full",
              syncing && "bg-destructive"
            )}
          ></span>
          <span className="text-muted-foreground">nichenovus.in</span>
        </div>
      </div>
      <nav className="flex-1">
        <ul className="space-y-10">
          {links.map((link) => (
            <li key={link.name} className="relative">
              {"/admin" + link.link === path && (
                <motion.span
                  layoutId="sidebar-active"
                  className="bg-accent absolute -left-3 top-0.5 h-4 w-1 inline-block rounded-full"
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
      <div className="space-y-4">
        <div className="h-2 bg-background rounded-sm">
          <div
            style={{ width: `${query.data?.credits.used_percent || 0}%` }}
            className="bg-accent rounded-sm h-full shadow-md shadow-accent/20 transition-all"
          ></div>
        </div>
        <div className="flex justify-between">
          <div>Credits Used</div>
          <div>
            {query.data?.credits.usage || "--"}/
            <span className="text-md">{query.data?.credits.limit || "--"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
