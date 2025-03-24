"use client";

import { z } from "zod";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import Message from "./message";

const formSchema = z.object({
  lot: z.string().min(1, "O lote é obrigatório").max(4, "O lote precisa ter no máximo 4 números"),
});

const MarsForm = () => {
  const [inputsFocused, setInputsFocused] = useState({
    lot: false,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [messageAnimationShown, setMessageAnimationShown] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lot: "",
    },
  });

  const lot = watch("lot");

  useEffect(() => {
    if (lot.length > 0) {
      setInputsFocused((inputs) => ({ ...inputs, lot: true }));
    }
  }, [lot]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const currentMarsAddresses = localStorage.getItem("marsAddresses");
    let error = false;
    let marsAddressesFormatted: {
      lot: string;
    }[];

    if (currentMarsAddresses) {
      marsAddressesFormatted = JSON.parse(currentMarsAddresses);

      marsAddressesFormatted.forEach((marsAddress) => {
        if (marsAddress.lot === values.lot) {
          error = true;
        }
      });

      if (error) {
        showToaster("Lote já cadastrado!", "error");

        return;
      }

      marsAddressesFormatted.push(values);

      localStorage.setItem("marsAddresses", JSON.stringify(marsAddressesFormatted));

      showToaster("Lote cadastrado com sucesso", "success");
      reset();
    } else {
      localStorage.setItem("marsAddresses", JSON.stringify([values]));

      showToaster("Lote cadastrado com sucesso", "success");
      reset();
    }
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

  const showToaster = (msg: string, type: "success" | "error") => {
    setMessage(msg);
    setMessageAnimationShown(true);
    setMessageType(type);

    setTimeout(() => setMessage(null), 3000);
    setTimeout(() => setMessageType(null), 3000);
    setTimeout(() => setMessageAnimationShown(false), 2700);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
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

        {errors.lot && <span className="text-red-500 leading-tight text-sm">{errors.lot.message}</span>}
      </div>

      <button type="submit" className="button">
        Cadastrar
      </button>

      {message && <Message animation={messageAnimationShown} message={message} type={messageType} />}
    </form>
  );
};

export default MarsForm;
