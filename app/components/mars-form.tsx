"use client";

import { z } from "zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lot: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const valueFormatted = e.target.value.replace(/\D/g, "");

    setValue("lot", valueFormatted);
  };

  const handleFocus = (input: "lot", value: boolean) => {
    const currentInputValue = getValues(input);

    if (currentInputValue) {
      return;
    }

    setInputsFocused((inputs) => ({ ...inputs, [input]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-10"
    >
      <div className="relative w-full h-fit flex flex-col gap-2">
        <label
          htmlFor="lot"
          className={cn("label", {
            "-top-2.5 text-sm": inputsFocused.lot,
            "text-red-500": errors.lot,
          })}
        >
          Lote *
        </label>

        <input
          {...register("lot")}
          type="text"
          id="lot"
          className={cn("input", {
            "border-red-500": errors.lot,
          })}
          onChange={handleNumber}
          onFocus={() => handleFocus("lot", true)}
          onBlur={() => handleFocus("lot", false)}
          maxLength={4}
        />

        {errors.lot && (
          <span className="text-red-500 leading-tight text-sm">
            {errors.lot.message}
          </span>
        )}
      </div>

      <button type="submit" className="button">
        Cadastrar
      </button>
    </form>
  );
};

export default MarsForm;
