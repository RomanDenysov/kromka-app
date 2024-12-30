'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeftIcon, CirclePlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useFieldArray, useForm } from 'react-hook-form'
import type { z } from 'zod'

import { Typography } from '~/components/typography'
import { Badge } from '~/components/ui/badge'
import { Button, buttonVariants } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Separator } from '~/components/ui/separator'
import { Switch } from '~/components/ui/switch'
import { Textarea } from '~/components/ui/textarea'
import { slugGenerator } from '~/lib/slug-generator'
import { capitalize, cn } from '~/lib/utils'
import { ProductVariantForm } from './product-variant-form'

type ProductValues = z.infer<typeof productSchema>

const ProductForm = () => {
  const form = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      variants: [],
      hasVariants: false,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variants',
  })

  return (
    <div className="space-y-4 md:space-y-8">
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
          <Button variant="outline">Discard</Button>
          <Button>Save</Button>
        </div>
      </div>

      <Form {...form}>
        <form
          id="product-form"
          name="product-form"
          className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
        >
          <div className="grid auto-rows-max gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Title"
                          onBlur={(e) => {
                            field.onChange(e)
                            form.setValue('slug', slugGenerator(e.target.value))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
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
                            field.onChange(e)
                            form.setValue('slug', slugGenerator(e.target.value))
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        This is automatically generated from the product name, but you can edit it.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
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
                <FormField
                  control={form.control}
                  name="composition"
                  render={({ field }) => (
                    <FormItem className="lg:col-span-2">
                      <FormLabel>Composition</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Composition" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="hasVariants"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>Product has variants</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {form.watch('hasVariants') && (
                  <div className="mt-4 space-y-4">
                    {fields.map((field, index) => (
                      <ProductVariantForm
                        key={field.id}
                        index={index}
                        form={form}
                        remove={remove}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
              <Separator />
              <CardFooter className="justify-center space-y-0 py-4">
                <Button size="sm" variant="ghost" className="w-auto md:w-1/2">
                  <CirclePlusIcon className="" />
                  Add variant
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Product status</CardTitle>
                <CardDescription>
                  This is the status of your product. You can change it to published or hidden.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col gap-y-1">
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" className="capitalize">
                              {field.value ? capitalize(field.value) : 'Select status'}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PRODUCT_STATUS_OPTIONS.map((status) => (
                            <SelectItem key={status} value={status} className="capitalize">
                              {/* {capitalize(status)} */}
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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

            <Card>
              <CardHeader>
                <CardTitle>Product Price</CardTitle>
                <CardDescription>This is the price of your product</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <PriceInput {...field} placeholder="0.00" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { ProductForm }
