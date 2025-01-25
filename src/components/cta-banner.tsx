import { MoveRightIcon, PhoneCallIcon } from 'lucide-react';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';
import { cn } from '~/lib/utils/cn';
import { Typography } from './typography';
import { Badge } from './ui/badge';
import { buttonVariants } from './ui/button';

export const CtaBanner = () => {
  return (
    <article className="pt-10 pb-20 md:pt-20 md:pb-40">
      <div className="flex flex-col items-center gap-8 rounded-md bg-muted p-4 text-center lg:p-14">
        <div>
          <Badge>Poďme do toho spolu</Badge>
        </div>

        <Balancer className="flex flex-col gap-2">
          <Typography variant="h3">
            Radi sa spájame s tými, ktorí majú na jedlo podobný pohľad
          </Typography>
          <Typography variant="p">
            Pečieme kváskový chlieb, koláče, ponúkame dobrú kávu, a do našich
            predajní vyberáme samé lakocinky. Nájdete nás v Prešove aj v
            Košiciach, zastavte sa!
          </Typography>
        </Balancer>
        <div className="flex flex-col-reverse gap-4 px-2 sm:flex-row sm:px-0">
          <Link href="#" className={cn(buttonVariants({ variant: 'outline' }))}>
            Kontaktovať nás <PhoneCallIcon className="h-4 w-4" />
          </Link>
          <Link href="#" className={cn(buttonVariants({}))}>
            Napíšte nám <MoveRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};
