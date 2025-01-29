import { PlusIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getProducts } from '~/actions/products';
import { DataTable } from '~/components/data-table';
import { Typography } from '~/components/typography';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils/cn';
import { log } from '~/lib/utils/log';
import { columns } from './columns';

export default async function Page() {
  const t = await getTranslations('admin.shop.products');
  const products = await getProducts();

  log.debug(`Products: ${products}`);
  return (
    <>
      <div className="flex items-center justify-between">
        <Typography variant="h3">
          {t('title')} ({products.length})
        </Typography>
        <Link
          href="/admin/shop/products/new"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          {t('new')}
          <PlusIcon className="size-4" />
        </Link>
      </div>

      {products.length > 0 ? (
        <DataTable columns={columns} data={products} canCreateNew />
      ) : (
        <div>{t('empty')}</div>
      )}
    </>
  );
}
