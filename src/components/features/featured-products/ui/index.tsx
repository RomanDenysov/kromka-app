'use client';

import { useEffect, useState } from 'react';
import { Typography } from '~/components/typography';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '~/components/ui/carousel';

export const FeaturedProducts = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 1000);
  }, [api, current]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className=" mx-auto">
        <div className="flex flex-col gap-10">
          <Typography className="text-left font-regular text-xl tracking-tighter sm:text-3xl md:text-5xl lg:max-w-xl">
            Trusted by thousands of businesses worldwide
          </Typography>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {Array.from({ length: 15 }).map((_, index) => (
                <CarouselItem
                  className="basis-1/3 lg:basis-1/4"
                  key={index.toString()}
                >
                  <div className="flex aspect-square items-center justify-center rounded-md bg-muted p-6">
                    <div className="h-40 w-40">
                      <span className="text-sm">Logo {index + 1}</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
