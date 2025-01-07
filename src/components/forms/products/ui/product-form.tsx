'use client'

import { Typography } from '~/components/typography'
import { Badge } from '~/components/ui/badge'
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

import { Suspense, memo } from 'react'
import { BackButton } from '~/components/back-button'
import { FormActionButtons } from '~/components/form-action-buttons'
import { LoadingSpinner } from '~/components/loading-spinner'
import { useProductOperations } from '../api/use-product-operations'
import { useProductForm } from '../hooks/use-product-form'
import type { Product } from '../types'
import { CategorySelector } from './category-selector'
import { ProductDetails, ProductDetailsSkeleton } from './product-details'
import { ProductOptions, ProductOptionsSkeleton } from './product-options'

const ProductTitle = memo(({ product }: { product?: Product }) => (
  <div className="flex w-full items-center justify-start gap-4">
    <BackButton />
    <Typography variant="h3" className="truncate">
      {product?.name || 'New Product'}
    </Typography>
    {product && (
      <Badge variant="outline" className="hidden bg-card md:inline-flex">
        in stock
      </Badge>
    )}
  </div>
))

const ProductForm = ({ productId }: { productId?: string }) => {
  const { product, isLoading, handleSubmit } = useProductOperations(productId)
  const { form, ingredientsArray, addIngredient, onReset } = useProductForm(product)

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-4 md:space-y-8">
      <div className="flex items-center justify-between gap-4 md:gap-8">
        <ProductTitle product={product} />
        <FormActionButtons isLoading={isLoading} discard={onReset} form="product-form" />
      </div>

      <Form {...form}>
        <form
          id="product-form"
          name="product-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
        >
          <div className="grid auto-rows-max gap-4 lg:col-span-2 lg:gap-8">
            <Suspense fallback={<ProductDetailsSkeleton />}>
              <ProductDetails />
            </Suspense>

            <Suspense fallback={<ProductOptionsSkeleton />}>
              <ProductOptions />
            </Suspense>
          </div>

          <aside className="grid auto-rows-max items-start gap-4 lg:gap-8">
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
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <CategorySelector value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
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
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
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

export { ProductForm }
