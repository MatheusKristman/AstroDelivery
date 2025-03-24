"use client";

import Image from "next/image";
import { useState } from "react";

import MarsForm from "@/app/components/mars-form";
import EarthForm from "@/app/components/earth-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <Tabs
            defaultValue="earth"
            value={planet}
            onValueChange={setPlanet}
            className="w-full gap-8"
          >
            <div className="w-full flex flex-col gap-3">
              <span className="text-base font-medium text-foreground">
                Selecione o planeta
              </span>

              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="earth">Terra</TabsTrigger>

                <TabsTrigger value="mars">Marte</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="earth">
              <EarthForm />
            </TabsContent>

            <TabsContent value="mars">
              <MarsForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Forms;
