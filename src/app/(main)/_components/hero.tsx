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
            <Badge variant="outline">We&apos;re live!</Badge>
          </div>
          <div className="flex flex-col gap-4">
            <Balancer>
              <Typography variant="h1" className="text-left text-5xl md:text-7xl">
                The best way to get started with your next project.
              </Typography>

              <Typography
                variant="p"
                className="max-w-md text-left font-medium text-muted-foreground text-xl leading-relaxed tracking-tight md:max-w-lg md:text-2xl"
              >
                Managing a small business today is already tough. Avoid further complications by
                ditching outdated, tedious trade methods. Our goal is to streamline SMB trade,
                making it easier and faster than ever.
              </Typography>
            </Balancer>
          </div>

          <div className="flex flex-col-reverse gap-4 px-2 sm:flex-row sm:px-0">
            <Link href="#" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
              Jump on a call <PhoneCallIcon className="h-4 w-4" />
            </Link>
            <Link href="#" className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}>
              Sign up here <MoveRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="aspect-square rounded-md bg-muted"></div>
      </div>
    </section>
  )
}