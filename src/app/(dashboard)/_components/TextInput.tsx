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
import React from "react";
import { Control } from "react-hook-form";

type FieldTypes = "input" | "textarea";

interface TextInputProps {
  name: string;
  subtitle: string;
  fields: Record<string, FieldTypes>[];
}

const TextInput: React.FC<TextInputProps> = ({ name, subtitle, fields }) => {
  return (
    <div className="text-left flex gap-24 items-center max-w-xl">
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
                          <Input
                            className="min-w-64"
                            placeholder={capitalize(name)}
                            {...field}
                          />
                        )}
                        {fieldType === "textarea" && (
                          <Textarea
                            className="min-w-64"
                            placeholder={capitalize(name)}
                            {...field}
                          />
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
