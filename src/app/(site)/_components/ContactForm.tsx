"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import FeatherIcon from "feather-icons-react";
import { saveContact } from "@/app/actions/contact";
import { useMutation } from "@tanstack/react-query";
import { error } from "console";

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

const ContactForm = () => {
  const [error, setError] = useState("");
  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof contactSchema>) =>
      await saveContact(data),
    onSuccess: (data) => {
      setError(data.message);
    },
  });
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-10 text-center">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-transparent px-0 border-b rounded-none focus-visible:ring-0"
                    placeholder="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    className="bg-transparent px-0 border-b rounded-none focus-visible:ring-0"
                    placeholder="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-transparent px-0 border-b rounded-none focus-visible:ring-0"
                    placeholder="message"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {mutation.isSuccess && error && <div className="py-4">{error}</div>}
        {mutation.isSuccess && !error && (
          <div className="py-2">Sent! You will hear back from us soon</div>
        )}
        {!mutation.isSuccess && (
          <Button
            type="submit"
            className=" font-normal gap-2 bg-transparent hover:bg-transparent text-foreground/50 hover:text-foreground"
          >
            {mutation.isPending ? (
              <>
                Please wait{" "}
                <FeatherIcon icon="loader" size={18} className="animate-spin" />
              </>
            ) : (
              <>
                send message <FeatherIcon icon="arrow-right" size={18} />
              </>
            )}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ContactForm;
