"use client";

import Image from "next/image";
import { useState } from "react";

// import MarsForm from "@/app/components/mars-form";
// import EarthForm from "@/app/components/earth-form";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import EarthForm from "./earth-form";
import MarsForm from "./mars-form";

const Forms = () => {
  const [planet, setPlanet] = useState("earth");

  return (
    <div className="w-full flex flex-col gap-6">
      <Image
        src="/astro-logo.svg"
        alt="Logo"
        width={190}
        height={38}
        className="object-contain object-center mx-auto"
      />

      <div className="w-full flex flex-col gap-8">
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-3xl text-foreground">Cadastro de Endereços</h1>

          <p className="text-base text-foreground/75">
            Registre locais de entrega na Terra ou em Marte e facilite o
            transporte entre os planetas!
          </p>
        </div>

        <div className="w-full flex flex-col gap-8">
          <div className="w-full bg-muted rounded-2xl p-2 grid grid-cols-2 gap-2">
            <button
              className={cn(
                "cursor-pointer bg-transparent px-4 py-2 h-10 rounded-xl text-base text-foreground transition",
                {
                  "bg-primary shadow-sm text-white": planet === "earth",
                },
              )}
              onClick={() => setPlanet("earth")}
            >
              Terra
            </button>

            <button
              className={cn(
                "cursor-pointer bg-transparent px-4 py-2 h-10 rounded-xl text-base text-foreground transition",
                {
                  "bg-primary shadow-sm text-white": planet === "mars",
                },
              )}
              onClick={() => setPlanet("mars")}
            >
              Marte
            </button>
          </div>

          {planet === "earth" && <EarthForm />}

          {planet === "mars" && <MarsForm />}
        </div>
      </div>
    </div>
  );
};

export default Forms;
