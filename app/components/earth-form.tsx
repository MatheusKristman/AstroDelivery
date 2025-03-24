"use client";

import { z } from "zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import Message from "./message";

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
  const [message, setMessage] = useState<string | null>(null);
  const [messageAnimationShown, setMessageAnimationShown] = useState<boolean>(false);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const currentEarthAddresses = localStorage.getItem("earthAddresses");
    let error = false;
    let earthAddressesFormatted: {
      address: string;
      number: string;
      city: string;
      country: string;
    }[];

    if (currentEarthAddresses) {
      earthAddressesFormatted = JSON.parse(currentEarthAddresses);

      earthAddressesFormatted.forEach((earthAddress) => {
        if (
          earthAddress.address.toLowerCase() === values.address.toLowerCase() &&
          earthAddress.number === values.number &&
          earthAddress.city.toLowerCase() === values.city.toLowerCase() &&
          earthAddress.country.toLowerCase() === values.country.toLowerCase()
        ) {
          error = true;
        }
      });

      if (error) {
        showToaster("Endereço já cadastrado!", "error");

        return;
      }

      earthAddressesFormatted.push(values);

      localStorage.setItem("earthAddresses", JSON.stringify(earthAddressesFormatted));

      showToaster("Endereço cadastrado com sucesso", "success");
      reset();
    } else {
      localStorage.setItem("earthAddresses", JSON.stringify([values]));

      showToaster("Endereço cadastrado com sucesso", "success");
      reset();
    }
  };

  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const valueFormatted = e.target.value.replace(/\D/g, "");

    setValue("number", valueFormatted);
  };

  const handleFocus = (input: "address" | "number" | "city" | "country", value: boolean) => {
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
      <div className="w-full flex flex-col gap-8">
        <div className="w-full grid grid-cols-1 gap-8 sm:grid-cols-[calc(65%-8px)_calc(35%-8px)] sm:gap-4">
          <div className="relative w-full h-fit flex flex-col gap-2">
            <label
              htmlFor="address"
              className={cn("label", {
                "-top-2.5 text-sm": inputsFocused.address,
                "text-red-500": errors.address,
              })}
            >
              Endereço *
            </label>

            <input
              {...register("address")}
              type="text"
              id="address"
              className={cn("input", {
                "border-red-500": errors.address,
              })}
              onFocus={() => handleFocus("address", true)}
              onBlur={() => handleFocus("address", false)}
            />

            {errors.address && <span className="text-red-500 leading-tight text-sm">{errors.address.message}</span>}
          </div>

          <div className="relative w-full h-fit flex flex-col gap-2">
            <label
              htmlFor="number"
              className={cn("label", {
                "-top-2.5 text-sm": inputsFocused.number,
                "text-red-500": errors.number,
              })}
            >
              Número *
            </label>

            <input
              {...register("number")}
              type="text"
              id="address"
              className={cn("input", {
                "border-red-500": errors.number,
              })}
              onChange={handleNumber}
              onFocus={() => handleFocus("number", true)}
              onBlur={() => handleFocus("number", false)}
            />

            {errors.number && <span className="text-red-500 leading-tight text-sm">{errors.number.message}</span>}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
          <div className="relative w-full h-fit flex flex-col gap-2">
            <label
              htmlFor="city"
              className={cn("label", {
                "-top-2.5 text-sm": inputsFocused.city,
                "text-red-500": errors.city,
              })}
            >
              Cidade *
            </label>

            <input
              {...register("city")}
              type="text"
              id="city"
              className={cn("input", {
                "border-red-500": errors.city,
              })}
              onFocus={() => handleFocus("city", true)}
              onBlur={() => handleFocus("city", false)}
            />

            {errors.city && <span className="text-red-500 leading-tight text-sm">{errors.city.message}</span>}
          </div>

          <div className="relative w-full h-fit flex flex-col gap-2">
            <label
              htmlFor="country"
              className={cn("label", {
                "-top-2.5 text-sm": inputsFocused.country,
                "text-red-500": errors.country,
              })}
            >
              País *
            </label>

            <input
              {...register("country")}
              type="text"
              id="address"
              className={cn("input", {
                "border-red-500": errors.country,
              })}
              onFocus={() => handleFocus("country", true)}
              onBlur={() => handleFocus("country", false)}
            />

            {errors.country && <span className="text-red-500 leading-tight text-sm">{errors.country.message}</span>}
          </div>
        </div>
      </div>

      <button type="submit" className="button">
        Cadastrar
      </button>

      {message && <Message animation={messageAnimationShown} message={message} type={messageType} />}
    </form>
  );
};

export default EarthForm;
