import { PlusCircleIcon, TrashIcon } from 'lucide-react'
import { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { PriceInput } from '../../price-input'
import { useProductOptions } from '../hooks/use-product-options'
import type { CreateProductInput } from '../types'
import { OptionUnitSelect } from './option-unit-select'

const ProductOptions = () => {
  const { optionsArray, addOption, isEmpty, canManageOptions } = useProductOptions()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product Options</CardTitle>
        <CardDescription>Configure variants and pricing</CardDescription>
      </CardHeader>
      <CardContent className="p-1 sm:p-2 md:p-6">
        {canManageOptions ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">SKU</TableHead>
                  <TableHead className="w-[80px]">Value</TableHead>
                  <TableHead className="w-[80px]">Unit</TableHead>
                  <TableHead className="w-[80px]">Price</TableHead>
                  <TableHead className="w-[60px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {optionsArray.fields.map((field, index) => (
                  <OptionRow
                    key={field.id}
                    index={index}
                    field={field}
                    onRemove={() => optionsArray.remove(index)}
                    isRemoveDisabled={optionsArray.fields.length === 1}
                  />
                ))}
                {isEmpty && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No variants added yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
            <p>Select a category and enter product name to manage variants</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button type="button" onClick={addOption} size="sm" variant="ghost" className="gap-1">
          <PlusCircleIcon size={14} />
          Add Variant
        </Button>
      </CardFooter>
    </Card>
  )
}

type OptionRowProps = {
  index: number
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  field: any
  onRemove: () => void
  isRemoveDisabled: boolean
}

const OptionRow = memo(({ index, field, onRemove, isRemoveDisabled }: OptionRowProps) => {
  const form = useFormContext<CreateProductInput>()

  return (
    <TableRow key={field.id}>
      <TableCell className="py-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="outline"
                className="line-clamp-1 w-full cursor-default px-1 text-start text-xs active:line-clamp-none"
              >
                {field.sku}
              </Badge>
            </TooltipTrigger>
            <TooltipContent side="top" align="start">
              {field.sku}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>

      <TableCell className="py-2">
        <FormField
          control={form.control}
          name={`options.${index}.value`}
          render={({ field }) => (
            <FormItem className="w-[60px]">
              <FormControl>
                <Input {...field} type="text" className="w-full" min={0} />
              </FormControl>
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="py-2">
        {/* Unit */}
        <OptionUnitSelect index={index} control={form.control} />
      </TableCell>
      <TableCell className="py-2">
        {/* Price */}
        <FormField
          control={form.control}
          name={`options.${index}.price`}
          render={({ field }) => (
            <FormItem className="w-[80px] space-y-0">
              <FormControl>
                <PriceInput {...field} placeholder="0.00" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="py-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="hover:bg-destructive hover:text-primary-foreground"
          onClick={onRemove}
          disabled={isRemoveDisabled}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
})

const ProductOptionsSkeleton = () => {
  ;<Card>
    <CardHeader>
      <CardTitle className="h-4 w-[200px] animate-pulse rounded bg-muted" />
      <CardDescription className="h-4 w-[300px] animate-pulse rounded bg-muted" />
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="h-4 w-[200px] animate-pulse rounded bg-muted" />
            <TableHead className="h-4 w-[100px] animate-pulse rounded bg-muted" />
            <TableHead className="h-4 w-[100px] animate-pulse rounded bg-muted" />
            <TableHead className="h-4 w-[100px] animate-pulse rounded bg-muted" />
            <TableHead className="h-4 w-[100px] animate-pulse rounded bg-muted" />
            <TableHead className="h-4 w-[100px] animate-pulse rounded bg-muted" />
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3].map((i) => (
            <TableRow key={i}>
              <TableCell className="py-2">
                <div className="h-4 w-[180px] animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell className="py-2">
                <div className="h-8 w-[120px] animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell className="py-2">
                <div className="h-8 w-[80px] animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell className="py-2">
                <div className="h-8 w-[120px] animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell className="py-2">
                <div className="h-8 w-[100px] animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell className="py-2">
                <div className="h-6 w-[40px] animate-pulse rounded bg-muted" />
              </TableCell>
              <TableCell className="py-2">
                <div className="h-8 w-8 animate-pulse rounded bg-muted" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter className="justify-center border-t p-4">
      <div className="h-8 w-[120px] animate-pulse rounded bg-muted" />
    </CardFooter>
  </Card>
}

export { ProductOptions, ProductOptionsSkeleton }
