import { PlusCircleIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { useProductOptions } from '../hooks/use-product-options'
import { OptionRow } from './option-row'

const ProductOptions = () => {
  const { optionsArray, addOption, isEmpty, canManageOptions } = useProductOptions()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Options</CardTitle>
        <CardDescription>Configure variants and pricing</CardDescription>
      </CardHeader>
      <CardContent>
        {canManageOptions ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">SKU</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Default</TableHead>
                <TableHead />
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
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
            <p>Select a category and enter product name to manage variants</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button type="button" onClick={addOption} size="sm" variant="ghost" className="gap-1">
          <PlusCircleIcon className="h-3.5 w-3.5" />
          Add Variant
        </Button>
      </CardFooter>
    </Card>
  )
}

const ProductOptionsSkeleton = () => {
  return (
    <Card>
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
                <TableCell>
                  <div className="h-4 w-[180px] animate-pulse rounded bg-muted" />
                </TableCell>
                <TableCell>
                  <div className="h-8 w-[120px] animate-pulse rounded bg-muted" />
                </TableCell>
                <TableCell>
                  <div className="h-8 w-[80px] animate-pulse rounded bg-muted" />
                </TableCell>
                <TableCell>
                  <div className="h-8 w-[120px] animate-pulse rounded bg-muted" />
                </TableCell>
                <TableCell>
                  <div className="h-8 w-[100px] animate-pulse rounded bg-muted" />
                </TableCell>
                <TableCell>
                  <div className="h-6 w-[40px] animate-pulse rounded bg-muted" />
                </TableCell>
                <TableCell>
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
  )
}

export { ProductOptions, ProductOptionsSkeleton }
