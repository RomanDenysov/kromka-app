import Image from 'next/image';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';
import { Typography } from '~/components/typography';
import { cn } from '~/lib/utils/cn';

export const BentoGrid = () => {
  return (
    <section className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      <BentoGridItem href="#" className="col-span-2 aspect-video" />
      <BentoGridItem href="#" className=" " />
      <BentoGridItem href="#" className="" />
      <BentoGridItem href="#" className="col-span-2 aspect-video" />
    </section>
  );
};

export const BentoGridItem = ({
  href,
  className,
}: { href: string; className?: string }) => {
  return (
    <Link
      href={href}
      className={cn('relative aspect-auto rounded bg-muted', className)}
    >
      <Image
        priority
        src="/placeholder.png"
        alt="Product image"
        fill
        className="absolute inset-0 z-0 rounded object-cover object-center"
      />
      <div className="absolute grid size-full place-content-center">
        <Balancer>
          <Typography variant="h1" className=" text-left text-5xl md:text-7xl">
            Pečieme s láskou chlieb, koláče a ponúkame dobrú kávu
          </Typography>
        </Balancer>
      </div>
    </Link>
  );
};
