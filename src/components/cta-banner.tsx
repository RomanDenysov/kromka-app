import { MoveRightIcon, PhoneCallIcon } from 'lucide-react'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { cn } from '~/lib/utils'
import { Typography } from './typography'
import { Badge } from './ui/badge'
import { buttonVariants } from './ui/button'

export const CtaBanner = () => {
  return (
    <article className="pt-10 pb-20 md:pt-20 md:pb-40">
      <div className="flex flex-col items-center gap-8 rounded-md bg-muted p-4 text-center lg:p-14">
        <div>
          <Badge>Get started</Badge>
        </div>

        <Balancer className="flex flex-col gap-2">
          <Typography variant="h3">Try our platform today!</Typography>
          <Typography variant="p">
            Managing a small business today is already tough. Avoid further complications by
            ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it
            easier and faster than ever.
          </Typography>
        </Balancer>
        <div className="flex flex-col-reverse gap-4 px-2 sm:flex-row sm:px-0">
          <Link href="#" className={cn(buttonVariants({ variant: 'outline' }))}>
            Jump on a call <PhoneCallIcon className="h-4 w-4" />
          </Link>
          <Link href="#" className={cn(buttonVariants({}))}>
            Sign up here <MoveRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
