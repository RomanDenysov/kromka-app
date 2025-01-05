import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { Typography } from '~/components/typography'
import { Badge } from '~/components/ui/badge'
import { cn } from '~/lib/utils'

const FeatureItem = ({
  href,
  title,
  description,
  className,
}: {
  href: string
  title: string
  description: string
  className?: string
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex aspect-square flex-col justify-between rounded-md bg-muted p-6',
        className,
      )}
    >
      <Typography variant="h4" className="text-left font-bold text-2xl">
        {title}
      </Typography>
      <Typography
        variant="p"
        className="max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight md:text-xl"
      >
        {description}
      </Typography>
    </Link>
  )
}

export const Features = () => {
  return (
    <section className="py-20 lg:py-40">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-4">
          <div>
            <Badge>Platform</Badge>
          </div>
          <div className="flex flex-col">
            <Balancer className="space-y-2">
              <Typography variant="h3" className="text-left font-bold text-4xl">
                Čo pre vás pečieme
              </Typography>
              <Typography
                variant="p"
                className="max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight md:text-xl"
              >
                Vytvorte si svoje Kromka konto a objavte všetky naše chutné produkty
              </Typography>
            </Balancer>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureItem
            href="#"
            title="Kváskový chlieb"
            description="Domáci chlieb upečený s láskou a na kvase"
            className="lg:col-span-2 lg:aspect-auto"
          />
          <FeatureItem href="#" title="Koláče" description="Sladké dobroty pre každú príležitosť" />
          <FeatureItem href="#" title="Káva" description="Výberová káva z lokálnej pražiarne" />
          <FeatureItem
            href="#"
            title="Lakocinky"
            description="Starostlivo vybrané produkty od našich partnerov"
            className="lg:col-span-2 lg:aspect-auto"
          />
        </div>
      </div>
    </section>
  )
}
