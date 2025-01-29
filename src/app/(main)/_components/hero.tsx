import { MoveRightIcon, PhoneCallIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';
import { Search } from '~/components/features/search/ui';
import { Typography } from '~/components/typography';
import { Badge } from '~/components/ui/badge';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils/cn';

export const Hero = () => {
  const t = useTranslations('homepage.hero');
  return (
    <section className="py-20 lg:py-40">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div>
            <Badge variant="outline">{t('badge')}</Badge>
          </div>
          <div className="flex flex-col gap-2">
            <Balancer>
              <Typography
                variant="h1"
                className="text-left text-5xl md:text-7xl"
              >
                {t('title')}
              </Typography>
            </Balancer>

            <Typography
              variant="p"
              className="max-w-md text-left font-medium text-muted-foreground text-xl leading-relaxed tracking-tight md:max-w-lg md:text-2xl"
            >
              {t('description')}
            </Typography>
          </div>

          <div className="flex flex-col-reverse gap-4 px-2 sm:flex-row sm:px-0">
            <Link
              href="#"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              Kontaktujte nás <PhoneCallIcon className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
            >
              Nakupovať <MoveRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <Search />
        </div>
        <div className="aspect-square rounded-md bg-muted" />
      </div>
    </section>
  );
};
