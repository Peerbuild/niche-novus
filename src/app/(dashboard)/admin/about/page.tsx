"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput } from "../../_components";
import useAutoSaveForm from "@/hooks/useAutoSaveForm";
import { getAbout, updateAbout } from "@/app/actions/about";
import { aboutSchema } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import { VideoInput } from "../../_components";

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
        videoUrl: "",
      },
      values: query.data,
    }
  );

  return (
    <div className="py-10">
      <Form {...form}>
        <form className="space-y-8">
          <VideoInput
            name="about video"
            subtitle="Size Limit:1.5mb"
            fieldName="videoUrl"
            register={form.register}
            uploadProgress={progress["videoUrl"]}
            aspectRatio={16 / 9}
            videoUrl={query.data?.videoUrl}
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
