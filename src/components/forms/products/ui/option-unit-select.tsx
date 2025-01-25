import type { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import type { CreateProductInput } from '../types'

type Props = {
  index: number
  control: Control<CreateProductInput>
}

const UNITS = ['g', 'kg', 'ml', 'l', 'ks']

export const OptionUnitSelect = ({ index, control }: Props) => {
  return (
    <FormField
      control={control}
      name={`options.${index}.unit`}
      render={({ field }) => (
        <FormItem className="space-y-0">
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-[60px]">
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
              {UNITS.map((unit) => (
                <SelectItem value={unit} key={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
