'use client';

import { Suspense, useState } from 'react';
import { FormActionButtons } from '~/components/form-action-buttons';
import { LoadingSpinner } from '~/components/loading-spinner';
import {} from '~/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Switch } from '~/components/ui/switch';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormWrapper } from '~/components/form-wrapper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { toast } from '~/hooks/use-toast';
import { capitalize } from '~/lib/utils/capitalize';
import { api } from '~/trpc/react';
import type { Ingredient, Product } from '../types';
import { CategorySelector } from './ui/category-selector';
import { ProductDetails } from './ui/product-details';
import { ProductDetailsSkeleton } from './ui/product-details';
import { ProductFormTitle } from './ui/product-form-title';
import { ProductOptionsFormSkeleton } from './ui/product-options-form';

const PRODUCT_STATUSES = ['draft', 'active', 'discontinued', 'sold'] as const;

const optionSchema = z.object({
  sku: z.string().min(1),
  unit: z.enum(['kg', 'g', 'l', 'ml', 'pcs']),
  value: z.coerce.number().positive(),
  price: z.coerce.number().nonnegative(),
  sortOrder: z.number().int().nonnegative(),
});

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  categoryId: z.string().min(1),
  productStatus: z.string().min(1),
  isVisible: z.boolean(),
  sortOrder: z.number().int().nonnegative(),
  options: z.array(optionSchema),
});

export type OptionFormValues = z.infer<typeof optionSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;

export const ProductForm = (props: { product: Product }) => {
  const { product } = props;
  const router = useRouter();
  const utils = api.useUtils();

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    product?.ingredients || []
  );
  const [options, setOptions] = useState(product?.options || []);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: '',
      slug: '',
      description: '',
      categoryId: '',
      productStatus: 'draft',
      isVisible: false,
      sortOrder: 0,
      options: [],
    },
  });

  const { mutateAsync, isPending } = api.products.create.useMutation({
    onSuccess: () => {
      toast({
        title: 'Product created',
        description: 'Product created successfully',
      });
      utils.products.invalidate();
      router.refresh();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    },
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  const handleSubmit = async (values: ProductFormValues) => {
    await mutateAsync({ ...values, ingredients });
  };

  const productStatusBadge = Boolean(
    product?.productStatus === 'active' && product?.isVisible
  );

  return (
    <div className="mx-auto max-w-full space-y-4">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row md:gap-8">
        <ProductFormTitle name={product?.name} status={productStatusBadge} />
        <FormActionButtons
          isLoading={isPending}
          discard={form.reset}
          form="product-form"
        />
      </div>

      <Form {...form}>
        <form
          id="product-form"
          name="product-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
        >
          <div className="grid min-w-0 auto-rows-max gap-4 lg:col-span-2 lg:gap-8">
            <Suspense fallback={<ProductDetailsSkeleton />}>
              <ProductDetails />
            </Suspense>

            <Suspense fallback={<ProductOptionsFormSkeleton />}>
              <ProductOptionsForm />
            </Suspense>
          </div>

          <div className="grid min-w-0 auto-rows-max items-start gap-4 sm:grid-cols-2 md:grid-cols-1 lg:gap-8">
            <FormWrapper
              title="Product Category"
              description="Select a category for your product"
            >
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Category</FormLabel>
                    <FormControl>
                      <CategorySelector
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormWrapper>

            <FormWrapper
              title="Product Status"
              description="Select a status for your product"
            >
              <FormField
                control={form.control}
                name="productStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue="draft"
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue className="capitalize" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
                          {PRODUCT_STATUSES.map((status) => (
                            <SelectItem
                              key={status}
                              value={status}
                              className="capitalize"
                            >
                              {capitalize(status)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormWrapper>

            <FormWrapper
              title="Product Visibility"
              description="Select if the product is visible to the public"
            >
              <FormField
                control={form.control}
                name="isVisible"
                render={({ field }) => (
                  <FormItem className="mt-0 flex items-center justify-between space-y-0 rounded-md border px-4 py-2">
                    <FormLabel className="flex-1 text-sm">Visibility</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </FormWrapper>
          </div>
        </form>
      </Form>
    </div>
  );
};
