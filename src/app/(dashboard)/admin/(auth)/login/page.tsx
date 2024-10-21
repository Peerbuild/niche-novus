"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import "../../../admin.css";

const page = () => {
  return (
    <div className="flex justify-center items-center min-h-svh">
      <Button onClick={() => signIn("google")}>Login into Dashboard</Button>
    </div>
  );
};

export default page;
