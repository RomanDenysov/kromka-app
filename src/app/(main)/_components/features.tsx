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
                Čo pre vás mame
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
            href="/obchod"
            title="E-shop"
            description="Prehliadajte si náš široký sortiment produktov online"
            className="lg:col-span-2 lg:aspect-auto"
          />
          <FeatureItem
            href="/blog"
            title="Blog"
            description="Články, novinky a zaujímavosti zo sveta pekárstva"
          />
          <FeatureItem
            href="/b2b"
            title="B2B Riešenia"
            description="Špeciálne ponuky a služby pre firmy a podnikateľov"
          />
          <FeatureItem
            href="/spolupraca"
            title="Spolupráca"
            description="Staňte sa naším obchodným partnerom alebo dodávateľom"
            className="lg:col-span-2 lg:aspect-auto"
          />
        </div>
      </div>
    </section>
  )
}
