"use client";
import { ActionResponse } from "@/lib/ActionResponse";
import { useEffect, useMemo } from "react";
import { FieldValues, useForm, UseFormProps, useWatch } from "react-hook-form";

const DEBOUNCE_TIME = 500;

export default function useAutoSaveForm<T extends FieldValues>(
  submitAction: (values: T) => Promise<ActionResponse>,
  options: UseFormProps<T>,
  variables?: any
) {
  const form = useForm<T>(options);

  const watchValues = useWatch({ control: form.control });

  useEffect(() => {
    async function onSubmit(values: T) {
      if (!form.formState.isDirty) {
        return;
      }
      console.log({ ...values, ...variables });
      await submitAction({ ...values, ...variables });
    }

    const timeout = setTimeout(() => {
      form.handleSubmit(onSubmit)();
    }, DEBOUNCE_TIME);

    return () => {
      clearTimeout(timeout);
    };
  }, [watchValues, form, submitAction]);

  return form;
}
