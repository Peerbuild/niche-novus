"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput } from "../../../_components";
import useAutoSaveForm from "@/hooks/useAutoSaveForm";
import { getAbout, updateAbout } from "@/app/actions/about";
import { aboutSchema } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import { VideoInput } from "../../../_components";

export default function AboutPage() {
  const query = useQuery({
    queryKey: ["about"],
    queryFn: async () => await getAbout(),
  });

  const { form, progress } = useAutoSaveForm<z.infer<typeof aboutSchema>>(
    updateAbout,
    {
      resolver: zodResolver(aboutSchema),
      defaultValues: {
        introduction: "",
        image: "",
      },
      values: query.data,
    }
  );

  console.log(query.data);
  return (
    <div className="py-10">
      <Form {...form}>
        <form className="space-y-8">
          <VideoInput
            name="about image"
            subtitle="Size Limit:1.5mb"
            fieldName="image"
            register={form.register}
            uploadProgress={progress["image"]}
            aspectRatio={16 / 9}
            videoUrl={query.data?.image || ""}
            type="image"
          />
          <TextInput
            name="introduction"
            subtitle="Edit personal info"
            fields={[{ introduction: "textarea" }]}
            uploadProgress={progress}
            maxLimit={{ introduction: 200 }}
          />
        </form>
      </Form>
    </div>
  );
}
