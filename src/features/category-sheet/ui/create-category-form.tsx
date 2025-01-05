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
import { Textarea } from '~/components/ui/textarea'
import { slugGenerator } from '~/lib/slug-generator'
import { useCreateCategoryForm } from '../use-create-category-form'

export const CreateCategoryForm = () => {
  const { form, onSubmit } = useCreateCategoryForm()

  return (
    <Form {...form}>
      <form
        name="create-category-form"
        id="create-category-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 py-6"
      >
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
            <FormItem>
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
          name="isVisible"
          render={({ field }) => (
            <FormItem className="mt-0 flex items-center justify-between space-y-0 rounded-md border px-4 py-2">
              <FormLabel className="flex-1 text-sm">Visibility</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allowsDelivery"
          render={({ field }) => (
            <FormItem className="mt-02 flex items-center justify-between space-y-0 rounded-md border px-4 py-2">
              <FormLabel className="flex-1 text-sm">Delivery</FormLabel>
              <FormControl>
                <Switch
                  disabled
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
