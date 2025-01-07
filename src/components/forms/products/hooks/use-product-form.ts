'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

import { useCallback, useEffect, useMemo } from 'react'
import { createProductSchema, updateProductSchema } from '~/server/api/routers/products/validator'
import type { Product } from '../types'

export const useProductForm = (product?: Product) => {
  const validationSchema = product ? updateProductSchema : createProductSchema

  const defaultValues = useMemo(
    () =>
      product
        ? {
            name: product.name,
            slug: product.slug,
            description: product.description,
            categoryId: product.category.id,
            isVisible: product.isVisible,
            sortOrder: product.sortOrder,
            status: product.status ?? ('draft' as const),
            options: product.options,
            ingredients: product.ingredients,
          }
        : {
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

  const form = useForm<typeof validationSchema._type>({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: 'onChange', // Добавляем это
    delayError: 500,
  })

  const ingredientsArray = useFieldArray({
    control: form.control,
    name: 'ingredients',
  })

  const addIngredient = () => {
    ingredientsArray.append({
      name: '',
    })
  }

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
    ingredientsArray,
    addIngredient,
    onReset,
  }
}
