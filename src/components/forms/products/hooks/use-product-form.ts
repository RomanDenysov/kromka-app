import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const PRODUCT_STATUS_OPTIONS = ['published', 'hidden'] as const

const variantSchema = z.object({
  sku: z.string().min(1),
  variantType: z.enum(['weight', 'quantity', 'volume']),
  unit: z.enum(['g', 'kg', 'pcs', 'ml', 'l', 'ks']),
  value: z.coerce.number().min(0),
  price: z.coerce.number().min(0),
  isDefault: z.boolean(),
  isVisible: z.boolean(),
})

const inventorySchema = z.object({
  storeId: z.string(),
  variantId: z.string(),
  quantity: z.number().min(0),
  lowStockAlert: z.number().min(0).optional(),
  autoReorder: z.boolean().default(false),
  reorderPoint: z.number().min(0).optional(),
})

const productSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  composition: z.string().min(1),
  status: z.enum(PRODUCT_STATUS_OPTIONS),
  isVisible: z.boolean(),
  hasVariants: z.boolean(),
  variants: z.array(variantSchema).optional(),
  inventory: z.array(inventorySchema).optional(),
  category: z.string(),
})

export type VariantFormValues = z.infer<typeof variantSchema>
export type InventoryFormValues = z.infer<typeof inventorySchema>
export type ProductFormValues = z.infer<typeof productSchema>

// Default variant
const defaultVariant: Partial<VariantFormValues> = {
  variantType: 'weight',
  unit: 'g',
  value: 0,
  price: 0,
  isDefault: false,
  isVisible: true,
}

const defaultProduct: Partial<ProductFormValues> = {
  status: 'hidden',
  isVisible: true,
  hasVariants: false,
  variants: [],
  inventory: [],
}

export const useProductForm = ({ initialData }: { initialData?: Partial<ProductFormValues> }) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...defaultProduct,
      ...initialData,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
  })

  return { form, defaultVariant }
}
