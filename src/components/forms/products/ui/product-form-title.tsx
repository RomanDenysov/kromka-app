import { BackButton } from '~/components/back-button'
import { Typography } from '~/components/typography'
import { Badge } from '~/components/ui/badge'

export const ProductFormTitle = ({ name, status }: { name?: string; status?: boolean }) => {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <BackButton />
      <div className="min-w-0 flex-1">
        <Typography variant="h3" className="truncate">
          {name ?? 'New Product'}
        </Typography>
      </div>
      {status ? (
        <Badge variant="outline" className="hidden shrink-0 text-nowrap bg-card md:inline-flex">
          in stock
        </Badge>
      ) : (
        <Badge variant="destructive" className="hidden shrink-0 text-nowrap md:inline-flex">
          out of stock
        </Badge>
      )}
    </div>
  )
}
