'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'

import { createProductSchema, updateProductSchema } from '~/server/api/routers/products/validator'
import type { CreateProductInput, Product } from '../types'

export const useProductForm = (product?: Product) => {
  const validationSchema = product ? updateProductSchema : createProductSchema

  const form = useForm<CreateProductInput>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: product?.name || '',
      slug: product?.slug || '',
      description: product?.description || '',
      categoryId: product?.category?.id || '',
      isVisible: product?.isVisible ?? true,
      sortOrder: product?.sortOrder ?? 0,
      options: product?.options || [],
      ingredients:
        product?.ingredients?.map((ing) => ({
          id: ing.id || '',
        })) || [],
    },
  })

  const ingredientsArray = useFieldArray({
    control: form.control,
    name: 'ingredients',
  })

  const addIngredient = () => {
    ingredientsArray.append({
      id: '',
    })
  }

  return {
    form,
    ingredientsArray,
    addIngredient,
  }
}
