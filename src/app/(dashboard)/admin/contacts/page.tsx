"use client";
import { fetchContacts } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import FeatherIcon from "feather-icons-react";
import { Icon } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [page, setPage] = useState(1);
  const query = useQuery({
    queryKey: ["contacts", page],
    queryFn: async () => await fetchContacts(page),
    placeholderData: keepPreviousData,
  });

  if (query.data === undefined) return null;

  return (
    <div>
      <div className="bg-muted rounded-2xl px-10 py-6 relative  uppercase">
        <div className="flex gap-4">
          <div className="flex-grow-0 min-w-40">Name</div>
          <div className="flex-1">Emails</div>
        </div>
        <div className=" items-stretch hidden md:flex gap-4 absolute right-4 top-1/2 -translate-y-1/2 ">
          <div className="content-center">
            {(page - 1) * 10 + 1}-{(page - 1) * 10 + 1 + 9}
          </div>
          <div className="flex items-center justify-between">
            <Button
              variant={"link"}
              size={"icon"}
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              <FeatherIcon icon="arrow-left" size={20} />
            </Button>
            <Button
              variant={"link"}
              size={"icon"}
              disabled={query.data.length < 10}
              onClick={() => setPage((prev) => prev + 1)}
            >
              <FeatherIcon icon="arrow-right" size={20} />
            </Button>
          </div>
          <Separator
            orientation="vertical"
            className="bg-muted-foreground w-0.5 my-2"
          />
          <Button variant={"link"} size={"icon"}>
            <FeatherIcon icon="download" size={20} />
          </Button>
        </div>
      </div>
      <div className="p-6 space-y-1">
        {query.data?.map((contact) => {
          return (
            <a
              href={`https://mail.google.com/mail/u/0/#advanced-search/subset=all&has=${contact.email}&within=1d&sizeoperator=s_sl&sizeunit=s_smb`}
              key={contact.id}
              className="hover:bg-muted/40 px-4 py-4 cursor-pointer items-center rounded-xl flex gap-4 transition-colors"
            >
              <div className="flex-grow-0 min-w-40">{contact.name}</div>
              <div className="flex-1 truncate">{contact.email}</div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
