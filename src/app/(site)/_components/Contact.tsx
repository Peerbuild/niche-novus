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
        <div className="hidden cursor-pointer  gap-8 px-7 py-6 items-center fixed z-20 right-8 bottom-8 bg-background/60 backdrop-blur-lg">
          <div>
            <FeatherIcon icon="user-plus" />
          </div>
          <div>
            <div>More about Niche Novus!</div>
            <div>Get in touch.</div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="py-20 px-14 max-w-md bg-background/60 backdrop-blur-xl">
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
