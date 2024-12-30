'use client'

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

export const StoreInventory = ({ storeId }) => {
  const [inventory, setInventory] = useState([])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>
                  {item.variant.value} {item.variant.unit}
                </TableCell>
                <TableCell>{item.variant.sku}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.quantity}
                    className="w-24"
                    onChange={(e) => updateInventory(item.id, Number.parseInt(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => updateInventory(item.id, 0)}>
                    Clear
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
