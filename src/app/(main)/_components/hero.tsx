import { MoveRightIcon, PhoneCallIcon } from 'lucide-react'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { Typography } from '~/components/typography'
import { Badge } from '~/components/ui/badge'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export const Hero = () => {
  return (
    <section className="py-20 lg:py-40">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div>
            <Badge variant="outline">Vitajte v Kromke!</Badge>
          </div>
          <div className="flex flex-col gap-4">
            <Balancer>
              <Typography variant="h1" className="text-left text-5xl md:text-7xl">
                Pečieme s láskou chlieb, koláče a ponúkame dobrú kávu
              </Typography>

              <Typography
                variant="p"
                className="max-w-md text-left font-medium text-muted-foreground text-xl leading-relaxed tracking-tight md:max-w-lg md:text-2xl"
              >
                Nájdete nás v Prešove aj v Košiciach. Nakúpte pečivo, ktoré pre vás s láskou
                pečieme, alebo ďalšie lakocinky, ktoré sme starostlivo pripravili.
              </Typography>
            </Balancer>
          </div>

          <div className="flex flex-col-reverse gap-4 px-2 sm:flex-row sm:px-0">
            <Link href="#" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
              Kontaktujte nás <PhoneCallIcon className="h-4 w-4" />
            </Link>
            <Link href="#" className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}>
              Nakupovať <MoveRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="aspect-square rounded-md bg-muted"></div>
      </div>
    </section>
  )
}
