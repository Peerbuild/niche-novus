import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { capitalize, cn, isUploading } from "@/lib/utils";
import { progress } from "framer-motion";
import React from "react";
import { Control, useFormContext } from "react-hook-form";

type FieldTypes = "input" | "textarea";

interface TextInputProps {
  name: string;
  subtitle: string;
  fields: Record<string, FieldTypes>[];
  uploadProgress: Record<string, number>;
  maxLimit?: Record<string, number>;
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  subtitle,
  fields,
  uploadProgress,
  maxLimit,
}) => {
  const { getValues } = useFormContext();
  return (
    <div className="text-left flex md:flex-row flex-col relative z-20 gap-8 md:gap-24 md:items-center max-w-xl">
      <div className="space-y-2">
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
                const charCount = getValues(fieldName).length;
                console.log(charCount);
                return (
                  <FormItem className="flex gap-24 max-w-xl items-center">
                    <FormControl>
                      <div>
                        {fieldType === "input" && (
                          <div className="relative">
                            <Input
                              className="min-w-64"
                              placeholder={capitalize(name)}
                              disabled={isUploading(uploadProgress)}
                              {...field}
                            />
                            {maxLimit && (
                              <span
                                className={cn(
                                  "absolute -right-2 text-muted-foreground translate-x-full bottom-0",
                                  charCount > maxLimit[fieldName] &&
                                    "text-destructive"
                                )}
                              >
                                {charCount}/{maxLimit[fieldName]}
                              </span>
                            )}
                          </div>
                        )}
                        {fieldType === "textarea" && (
                          <div className="relative">
                            <Textarea
                              className="min-w-64"
                              placeholder={capitalize(name)}
                              disabled={isUploading(uploadProgress)}
                              {...field}
                            />
                            {maxLimit && (
                              <span
                                className={cn(
                                  "absolute -right-2 text-muted-foreground translate-x-full bottom-0",
                                  charCount > maxLimit[fieldName] &&
                                    "text-destructive"
                                )}
                              >
                                {charCount}/{maxLimit[fieldName]}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
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
