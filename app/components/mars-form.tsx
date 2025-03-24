"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";

const formSchema = z.object({
  lot: z
    .string()
    .min(1, "O lote é obrigatório")
    .max(4, "O lote precisa ter no máximo 4 números"),
});

const MarsForm = () => {
  const [inputsFocused, setInputsFocused] = useState({
    lot: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lot: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const handleFocus = (input: "lot", value: boolean) => {
    const currentInputValue = form.getValues(input);

    if (currentInputValue) {
      return;
    }

    setInputsFocused((inputs) => ({ ...inputs, [input]: value }));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="lot"
          render={({ field }) => (
            <FormItem className="relative h-fit">
              <FormLabel
                className={cn(
                  "pointer-events-none absolute top-1.5 left-3 text-base text-foreground/30 !font-normal p-0.5 bg-white transition-all duration-100",
                  {
                    "-top-2.5 text-sm": inputsFocused.lot,
                  },
                )}
              >
                Lote *
              </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  onFocus={() => handleFocus("lot", true)}
                  onBlur={() => handleFocus("lot", false)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button>Cadastrar</Button>
      </form>
    </Form>
  );
};

export default MarsForm;
