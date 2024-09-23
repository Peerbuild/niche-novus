import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

const TextInput = ({ name, subtitle }: { name: string; subtitle: string }) => {
  return (
    <FormField
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex gap-24 max-w-xl">
            <div>
              <FormLabel className="text-xl font-normal">
                {name[0].toUpperCase() + name.slice(1)}
              </FormLabel>
              <FormDescription className="text-base">
                {subtitle}
              </FormDescription>
            </div>
            <FormControl>
              <Input placeholder={name} {...field} />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default TextInput;
