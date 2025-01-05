import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { LoadingButton } from '~/components/loading-button'
import { Typography } from '~/components/typography'
import { Badge } from '~/components/ui/badge'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export default function Page() {
  return (
    <div className="flex items-center justify-between gap-4 md:gap-8">
      <div className="flex w-full items-center justify-start gap-4">
        <Link
          href="/admin/shop/products"
          className={cn(buttonVariants({ size: 'icon', variant: 'outline' }))}
        >
          <span className="sr-only">Back</span>
          <ChevronLeftIcon size={24} className="text-muted-foreground" />
        </Link>

        {/* Product Title if have product */}

        <Typography variant="h3" className="truncate">
          Product Title
        </Typography>

        <Badge variant="outline" className="hidden bg-card md:inline-flex">
          in stock
        </Badge>
      </div>

      <div className="flex w-full items-center justify-end gap-4">
        <LoadingButton
          isLoading={false}
          type="button"
          onClick={() => form.reset()}
          variant="outline"
        >
          Discard
        </LoadingButton>
        <LoadingButton isLoading={false} type="submit" form="product-form">
          Save
        </LoadingButton>
      </div>
    </div>
  )
}
