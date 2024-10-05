import { Form } from "@/components/ui/form";
import { Work } from "@prisma/client";
import React from "react";
import { TextInput, VideoInput } from "../../_components";
import useAutoSaveForm from "@/hooks/useAutoSaveForm";
import { workSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateWork } from "@/app/actions/work";

const WorksForm = ({ work }: { work: Work }) => {
  const { form, progress } = useAutoSaveForm<
    z.infer<typeof workSchema> & { id: string }
  >(
    updateWork,
    {
      resolver: zodResolver(workSchema),
      defaultValues: {
        title: work.title,
        description: work.description,
        videoUrl: work.videoUrl,
      },
    },
    { id: work.id }
  );

  return (
    <div>
      <Form {...form}>
        <form className="space-y-10">
          <VideoInput
            name="Video"
            subtitle="Size Limit:1.5mb"
            fieldName="videoUrl"
            register={form.register}
            uploadProgress={progress["videoUrl"]}
            aspectRatio={9 / 16}
            videoUrl={work.videoUrl}
          />
          <TextInput
            name="Description"
            subtitle="Edit personal info"
            fields={[{ title: "input" }, { description: "textarea" }]}
          />
        </form>
      </Form>
    </div>
  );
};

export default WorksForm;