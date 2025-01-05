import { TrashIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'
import { TableCell, TableRow } from '~/components/ui/table'
import { PriceInput } from '../../price-input'
import type { CreateProductInput } from '../types'

export const OptionRow = ({
  index,
  field,
  onRemove,
  isRemoveDisabled,
}: {
  index: number
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  field: any
  onRemove: () => void
  isRemoveDisabled: boolean
}) => {
  const form = useFormContext<CreateProductInput>()

  const handleDefaultChange = (checked: boolean) => {
    if (checked) {
      form.getValues('options').forEach((_, i) => {
        if (i !== index) {
          form.setValue(`options.${i}.isDefault`, false)
        }
      })
    }
    form.setValue(`options.${index}.isDefault`, checked)
  }

  return (
    <TableRow key={field.id}>
      <TableCell>
        <Badge variant="outline">{field.sku}</Badge>

        {/* <FormField
      control={form.control}
      name={`options.${index}.sku`}
      render={({ field }) => (
        <FormItem className="space-y-0">
          <FormControl>
            <Input {...field} placeholder="SKU" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    /> */}
      </TableCell>
      <TableCell>
        <FormField
          control={form.control}
          name={`options.${index}.optionType`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="weight">Weight</SelectItem>
                  <SelectItem value="quantity">Quantity</SelectItem>
                  <SelectItem value="volume">Volume</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <FormField
          control={form.control}
          name={`options.${index}.value`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormControl>
                <Input {...field} type="text" min={1} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        {/* Unit */}
        <FormField
          control={form.control}
          name={`options.${index}.unit`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="g">Grams (g)</SelectItem>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                  <SelectItem value="ml">Milliliters (ml)</SelectItem>
                  <SelectItem value="l">Liters (l)</SelectItem>
                  <SelectItem value="ks">Pieces (ks)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        {/* Price */}
        <FormField
          control={form.control}
          name={`options.${index}.price`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormControl>
                <PriceInput {...field} placeholder="0.00" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        {/* IsDefault */}
        <FormField
          control={form.control}
          name={`options.${index}.isDefault`}
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormControl>
                <Switch checked={field.value} onCheckedChange={handleDefaultChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          disabled={isRemoveDisabled}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}
