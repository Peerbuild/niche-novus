"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import TextInput from "../../_components/TextInput";
import useAutoSaveForm from "@/hooks/useAutoSaveForm";
import { updateAbout } from "@/app/actions/about";
import { aboutSchema } from "@/lib/schema";

export default function AboutPage() {
  const form = useAutoSaveForm<z.infer<typeof aboutSchema>>(updateAbout, {
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      introduction: "",
    },
  });

  return (
    <div className="py-10">
      <Form {...form}>
        <form className="space-y-8">
          <TextInput
            name="introduction"
            subtitle="Edit personal info"
            fields={[{ introduction: "textarea" }]}
          />
        </form>
      </Form>
    </div>
  );
}
