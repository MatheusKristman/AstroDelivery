import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const InfoBox = () => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden">
      <div className="w-full h-full">
        <Carousel className="w-full h-full">
          <CarouselContent className="w-full h-full -ml-0">
            <CarouselItem className="basis-full pl-0">
              <div className="relative w-full h-full">
                <Image
                  src="/item-1.jpg"
                  alt="Item 1"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      <div className="absolute inset-0 w-full h-full bg-foreground/50 px-6 py-5 flex flex-col justify-end gap-3.5 backdrop-blur-xs md:h-fit md:bottom-0 md:top-auto">
        <div className="w-full flex items-center justify-between">
          <h3 className="text-white text-lg font-semibold">Lorem Ipsum</h3>

          <div className="flex items-center gap-4">
            <div className="bg-white size-2 rounded-full" />
            <div className="bg-white size-2 rounded-full" />
            <div className="bg-white size-2 rounded-full" />
          </div>
        </div>

        <p className="text-sm text-white font-normal">
          Korem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus.{" "}
        </p>
      </div>
    </div>
  );
};

export default InfoBox;
