import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Skeleton } from '~/components/ui/skeleton'
import { Textarea } from '~/components/ui/textarea'
import { slugGenerator } from '~/lib/slug-generator'

import { IngredientsSelector } from './ingredients-selector'
import type { CreateProductInput } from '../types'

const ProductDetails = () => {
  const form = useFormContext<CreateProductInput>()
  const { control, setValue } = form

  const handleNameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value
    setValue('slug', slugGenerator(value))
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Basic information about the product</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Product name"
                    onBlur={handleNameBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Slug"
                    onChange={(e) => {
                      const value = slugGenerator(e.target.value)
                      field.onChange(value)
                    }}
                  />
                </FormControl>
                <FormDescription>
                  This is automatically generated from the product name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem className="lg:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Composition</CardTitle>
          <CardDescription>Manage product ingredients</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="ingredients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredients</FormLabel>
                <FormControl>
                  <IngredientsSelector
                    value={field.value.map((ing) => ing.id)}
                    onChange={(newValue) => {
                      field.onChange(newValue.map((id) => ({ id })))
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </>
  )
}

const ProductDetailsSkeleton = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Basic information about the product</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-24 lg:col-span-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Composition</CardTitle>
          <CardDescription>Manage product ingredients</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32" />
        </CardContent>
      </Card>
    </>
  )
}

export { ProductDetails, ProductDetailsSkeleton }
