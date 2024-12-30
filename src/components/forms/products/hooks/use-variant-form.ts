import { useCallback, useEffect } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { ProductFormValues, VariantFormValues } from './use-product-form'

export const useVariantForm = ({
  form,
  index,
}: {
  form: UseFormReturn<ProductFormValues>
  index: number
}) => {
  const isDefaultVariant = form.watch(`variants.${index}.isDefault`)
  const variantType = form.watch(`variants.${index}.variantType`)

  const updateUnitBasedOnType = useCallback(
    (type: VariantFormValues['variantType']) => {
      const unitMap: Record<VariantFormValues['variantType'], VariantFormValues['unit']> = {
        weight: 'g',
        volume: 'ml',
        quantity: 'ks',
      }
      form.setValue(`variants.${index}.unit`, unitMap[type])
    },
    [form, index],
  )

  useEffect(() => {
    updateUnitBasedOnType(variantType)
  }, [updateUnitBasedOnType, variantType])
}
