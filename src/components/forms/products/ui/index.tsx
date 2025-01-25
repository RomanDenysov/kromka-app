'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Switch } from '~/components/ui/switch'

import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { FormActionButtons } from '~/components/form-action-buttons'
import { LoadingSpinner } from '~/components/loading-spinner'
import { toast } from '~/hooks/use-toast'
import { log } from '~/lib/utils/log'
import { api } from '~/trpc/react'
import { useProductForm } from '../hooks/use-product-form'
import type { CreateProductInput, Product } from '../types'
import { CategorySelector } from './category-selector'
import { ProductDetails, ProductDetailsSkeleton } from './product-details'
import { ProductFormTitle } from './product-form-title'
import { ProductOptions, ProductOptionsSkeleton } from './product-options'
import { ProductStatusSelect } from './product-status-select'

type Props = {
  product?: Product
}

export const ProductForm = ({ product }: Props) => {
  const router = useRouter()
  const utils = api.useUtils()
  const { form, onReset } = useProductForm(product)
  const { mutateAsync: createMutation, isPending } = api.products.create.useMutation({
    onSuccess: () => {
      utils.products.invalidate()
      router.refresh()
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    },
  })

  const onSubmit = async (values: CreateProductInput) => {
    log.info('Submitting values:', values)
    await createMutation(values)
  }

  if (isPending) {
    return <LoadingSpinner />
  }

  const productStatusBadge = product?.status === 'active' && product?.isVisible

  return (
    <div className="mx-auto max-w-full space-y-4 md:space-y-8">
      <div className="flex min-w-0 flex-col items-center justify-between gap-4 sm:flex-row md:gap-8">
        <ProductFormTitle name={product?.name} status={productStatusBadge} />
        <FormActionButtons isLoading={isPending} discard={onReset} form="product-form" />
      </div>

      <Form {...form}>
        <form
          id="product-form"
          name="product-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid min-w-0 gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
        >
          <div className="grid min-w-0 auto-rows-max gap-4 lg:col-span-2 lg:gap-8">
            <Suspense fallback={<ProductDetailsSkeleton />}>
              <ProductDetails />
            </Suspense>

            <Suspense fallback={<ProductOptionsSkeleton />}>
              <ProductOptions />
            </Suspense>
          </div>

          <aside className="grid min-w-0 auto-rows-max items-start gap-4 sm:grid-cols-2 md:grid-cols-1 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
                <CardDescription>Select a category for your product</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Category</FormLabel>
                      <FormControl>
                        <CategorySelector value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <ProductStatusSelect control={form.control} />

            <Card>
              <CardHeader>
                <CardTitle>Visibility</CardTitle>
                <CardDescription>Make this product visible for clients</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </aside>
        </form>
      </Form>
    </div>
  )
}
