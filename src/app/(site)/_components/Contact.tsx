"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import FeatherIcon from "feather-icons-react";
import React from "react";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <Dialog
      modal={false}
      onOpenChange={(open) => {
        if (open) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      }}
    >
      <DialogTrigger>
        <div className="flex cursor-pointer rounded-lg md:rounded-none  md:gap-8 p-4 md:px-7 md:py-6 items-center fixed z-20 right-8 bottom-8 bg-background/60 backdrop-blur-lg">
          <div>
            <FeatherIcon icon="user-plus" />
          </div>
          <div className="text-left hidden md:block">
            <div>More about Niche Novus!</div>
            <div>Get in touch.</div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="py-20  px-14 max-w-md bg-background/60 backdrop-blur-xl w-[90svw] md:w-full">
        <DialogHeader className="mb-10 max-w-64 mx-auto">
          <DialogTitle className=" leading-snug">
            letter to the creator.
          </DialogTitle>
        </DialogHeader>
        <ContactForm />
      </DialogContent>
    </Dialog>
  );
};

export default Contact;
