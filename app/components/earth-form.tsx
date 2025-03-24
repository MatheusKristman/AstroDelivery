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
  address: z
    .string()
    .min(1, "O endereço é obrigatório")
    .min(5, "O endereço precisa ter no mínimo 5 caracteres")
    .max(200, "O endereço precisa ter no máximo 200 caracteres"),
  number: z.string().min(1, "O número é obrigatório"),
  city: z.string().min(1, "A cidade é obrigatória"),
  country: z.string().min(1, "O país é obrigatório"),
});

const EarthForm = () => {
  const [inputsFocused, setInputsFocused] = useState({
    address: false,
    number: false,
    city: false,
    country: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      number: "",
      city: "",
      country: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const handleFocus = (
    input: "address" | "number" | "city" | "country",
    value: boolean,
  ) => {
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
        <div className="w-full flex flex-col gap-8">
          <div className="w-full grid grid-cols-1 gap-8 sm:grid-cols-[calc(65%-8px)_calc(35%-8px)] sm:gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="relative h-fit">
                  <FormLabel
                    className={cn(
                      "pointer-events-none absolute top-1.5 left-3 text-base text-foreground/30 !font-normal p-0.5 bg-white transition-all duration-100",
                      {
                        "-top-2.5 text-sm": inputsFocused.address,
                      },
                    )}
                  >
                    Endereço *
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      onFocus={() => handleFocus("address", true)}
                      onBlur={() => handleFocus("address", false)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem className="relative h-fit">
                  <FormLabel
                    className={cn(
                      "pointer-events-none absolute top-1.5 left-3 text-base text-foreground/30 !font-normal p-0.5 bg-white transition-all duration-100",
                      {
                        "-top-2.5 text-sm": inputsFocused.number,
                      },
                    )}
                  >
                    Número *
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      onFocus={() => handleFocus("number", true)}
                      onBlur={() => handleFocus("number", false)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="relative h-fit">
                  <FormLabel
                    className={cn(
                      "pointer-events-none absolute top-1.5 left-3 text-base text-foreground/30 !font-normal p-0.5 bg-white transition-all duration-100",
                      {
                        "-top-2.5 text-sm": inputsFocused.city,
                      },
                    )}
                  >
                    Cidade *
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      onFocus={() => handleFocus("city", true)}
                      onBlur={() => handleFocus("city", false)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="relative h-fit">
                  <FormLabel
                    className={cn(
                      "pointer-events-none absolute top-1.5 left-3 text-base text-foreground/30 !font-normal p-0.5 bg-white transition-all duration-100",
                      {
                        "-top-2.5 text-sm": inputsFocused.country,
                      },
                    )}
                  >
                    País *
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      onFocus={() => handleFocus("country", true)}
                      onBlur={() => handleFocus("country", false)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button>Cadastrar</Button>
      </form>
    </Form>
  );
};

export default EarthForm;
