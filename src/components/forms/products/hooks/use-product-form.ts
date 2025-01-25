'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCallback, useEffect, useMemo } from 'react'
import { convertAmountFromCents } from '~/lib/utils'
import { createProductSchema } from '~/server/api/routers/products/validator'
import type { CreateProductInput, Product } from '../types'

export const useProductForm = (product?: Product) => {
  const defaultValues = useMemo(
    () =>
      product
        ? {
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            categoryId: product.category.id,
            isVisible: product.isVisible,
            sortOrder: product.sortOrder,
            status: product.status ?? ('draft' as const),
            options: product.options.map((option) => ({
              ...option,
              price: convertAmountFromCents(option.price),
              inventory: option.inventory?.map((inv) => ({
                ...inv,
                defaultQuantity: convertAmountFromCents(inv.defaultQuantity),
                currentQuantity: convertAmountFromCents(inv.currentQuantity),
              })),
            })),
            ingredients: product.ingredients,
          }
        : {
            id: undefined,
            name: '',
            slug: '',
            description: '',
            categoryId: '',
            isVisible: true,
            status: 'draft' as const,
            sortOrder: 0,
            options: [],
            ingredients: [],
          },
    [product], // зависимость только от product
  )

  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues,
    mode: 'onChange',
    delayError: 500,
  })

  const onReset = useCallback(() => {
    form.reset(defaultValues)
  }, [form.reset, defaultValues])

  useEffect(() => {
    if (product) {
      form.reset(defaultValues)
    }
  }, [product, form.reset, defaultValues])

  return {
    form,

    onReset,
  }
}
