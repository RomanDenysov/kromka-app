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
                Something new!
              </Typography>
              <Typography
                variant="p"
                className="max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight md:text-xl"
              >
                Managing a small business today is already tough.
              </Typography>
            </Balancer>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureItem
            href="#"
            title="Customers"
            description="Lorem ipsum dolor sit amet."
            className="lg:col-span-2 lg:aspect-auto"
          />
          <FeatureItem href="#" title="Employees" description="Lorem ipsum dolor sit amet." />
          <FeatureItem href="#" title="Products" description="Lorem ipsum dolor sit amet." />
          <FeatureItem
            href="#"
            title="Orders"
            description="Lorem ipsum dolor sit amet."
            className="lg:col-span-2 lg:aspect-auto"
          />
        </div>
      </div>
    </section>
  )
}
