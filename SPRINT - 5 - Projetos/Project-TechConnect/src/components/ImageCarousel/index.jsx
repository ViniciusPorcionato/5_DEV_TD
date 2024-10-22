import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export const ImageCarousel = ({ images }) => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      setApi={setApi}
      className="w-8/12 max-md:w-full self-center rounded-2xl "
    >
      {images.length != 1 ? (
        <CarouselContent className="rounded-2xl">
          {images.map((image, index) => (
            <CarouselItem className="rounded-2xl" key={index}>
              <div className="rounded-2xl">
                <img
                  src={image}
                  alt="Imagem do post"
                  className="aspect-[16/9] rounded-2xl border border-primary/50 object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      ) : (
        <div className="rounded-2xl">
          <img
            src={images}
            alt="Imagem do post"
            className="aspect-[16/9] rounded-2xl border border-primary/50 object-cover"
          />
        </div>
      )}

      {images.length != 1 && (
        <>
          {" "}
          <p className="text-center mt-2">
            {current} de {count}
          </p>
          <CarouselPrevious className="max-md:hidden -mt-4 bg-primary text-background" />
          <CarouselNext className="max-md:hidden -mt-4 bg-primary text-background" />
        </>
      )}
    </Carousel>
  );
};
