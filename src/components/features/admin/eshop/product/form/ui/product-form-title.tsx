import { BackButton } from '~/components/back-button';
import { Typography } from '~/components/typography';
import { Badge } from '~/components/ui/badge';

export const ProductFormTitle = ({
  name,
  status,
}: { name?: string; status: boolean }) => {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <BackButton />

      <Typography variant="h4" className="text-nowrap">
        {name ?? 'New Product'}
      </Typography>

      {status ? (
        <Badge
          variant="outline"
          className="hidden shrink-0 text-nowrap bg-card md:inline-flex"
        >
          in stock
        </Badge>
      ) : (
        <Badge
          variant="destructive"
          className="hidden shrink-0 text-nowrap md:inline-flex"
        >
          out of stock
        </Badge>
      )}
    </div>
  );
};
