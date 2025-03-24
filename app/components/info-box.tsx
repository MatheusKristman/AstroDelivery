import Image from "next/image";

const InfoBox = () => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden">
      <div className="relative w-full h-full">
        <Image src="/item-1.jpg" alt="Item 1" fill className="object-cover object-center" />
      </div>

      <div className="absolute inset-0 w-full h-full bg-foreground/50 px-6 py-5 flex flex-col justify-end gap-3.5 backdrop-blur-xs md:h-fit md:bottom-0 md:top-auto">
        <h3 className="text-white text-xl font-semibold">Conectando Mundos</h3>

        <p className="text-sm text-white font-normal">
          Envios rápidos e seguros entre a Terra e Marte. Seu pacote, entregue entre planetas com a mais alta tecnologia
          intergaláctica.
        </p>
      </div>
    </div>
  );
};

export default InfoBox;
