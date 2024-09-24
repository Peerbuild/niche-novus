import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { capitalize } from "@/lib/utils";
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import React from "react";
("");
type FieldTypes = "input" | "textarea";

const TextInput = ({
  name,
  subtitle,
  fields,
}: {
  name: string;
  subtitle: string;
  fields: Record<string, FieldTypes>[];
}) => {
  return (
    <div className="flex gap-24 items-center max-w-xl">
      <div>
        <div className="text-xl">{capitalize(name)}</div>
        <div className="text-muted-foreground">{subtitle}</div>
      </div>
      <div className="w-full space-y-4">
        {fields.map((field) => {
          const [fieldName, fieldType] = Object.entries(field)[0];
          return (
            <FormField
              key={fieldName}
              name={fieldName}
              render={({ field }) => {
                return (
                  <FormItem className="flex gap-24 max-w-xl items-center">
                    <FormControl>
                      <>
                        {fieldType === "input" && (
                          <Input placeholder={capitalize(name)} {...field} />
                        )}
                        {fieldType === "textarea" && (
                          <Textarea placeholder={capitalize(name)} {...field} />
                        )}
                      </>
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TextInput;
