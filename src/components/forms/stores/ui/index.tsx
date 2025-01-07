'use client'

import { BackButton } from '~/components/back-button'
import { FormActionButtons } from '~/components/form-action-buttons'
import { Typography } from '~/components/typography'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
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
import { Switch } from '~/components/ui/switch'
import { slugGenerator } from '~/lib/slug-generator'
import { useStoreOperations } from '../api/use-store-operation'
import { useStoreForm } from '../hooks/use-store-form'
import type { CreateStoreInput } from '../types'

export const StoreForm = ({ storeId }: { storeId?: string }) => {
  const { store, isLoading, handleSubmit } = useStoreOperations(storeId)
  const form = useStoreForm(store)

  const handleNameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value
    form.setValue('slug', slugGenerator(value))
  }

  const onSubmit = async (values: CreateStoreInput) => {
    console.log('Form submitted', values) // Добавьте это
    await handleSubmit(values)
  }

  return (
    <div className="space-y-4 md:space-y-8">
      <div className="flex items-center justify-between gap-4 md:gap-8">
        <div className="flex w-full items-center justify-start gap-4">
          <BackButton />

          <Typography variant="h3" className="truncate">
            {store?.name || 'New Store'}
          </Typography>

          {store?.isVisible ? (
            <Badge variant="outline">Open</Badge>
          ) : (
            <Badge variant="destructive">Closed</Badge>
          )}
        </div>
        <FormActionButtons isLoading={isLoading} discard={form.reset} form="store-form" />
      </div>
      <Form {...form}>
        <form
          id="store-form"
          name="store-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
        >
          <div className="grid auto-rows-max gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Stores Details</CardTitle>
                <CardDescription>Basic information about the store</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-2">
                <FormField
                  control={form.control}
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Store Address</CardTitle>
                <CardDescription>Basic information about the store</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-2">
                <FormField
                  control={form.control}
                  name="address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Street" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="City" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Zip" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressUrl"
                  render={({ field }) => (
                    <FormItem className="lg:col-span-2">
                      <FormLabel>Address URL</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Address URL" />
                      </FormControl>
                      <FormDescription>
                        This is automatically generated from the product name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <aside className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Working Hours</CardTitle>
                <CardDescription>Set working hours</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="workingHours.week"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Week</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Week" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workingHours.saturday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Saturday</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Saturday" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workingHours.sunday"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sunday</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Sunday" />
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
