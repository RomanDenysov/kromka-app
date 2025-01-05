'use client'

import { api } from '~/trpc/react'
import type { CreateProductInput } from '../types'

export const useProductOperations = (productId?: string) => {
  const utils = api.useUtils()

  const { data: product, isLoading: isLoadingProduct } = api.products.byId.useQuery(
    { id: productId || '' },
    {
      enabled: !!productId, // Запрос выполнится только если есть productId
    },
  )

  // Мутации
  const createMutation = api.products.create.useMutation({
    onSuccess: () => {
      utils.products.invalidate()
    },
  })

  const updateMutation = api.products.update.useMutation({
    onSuccess: () => {
      utils.products.invalidate()
    },
  })

  // Обработчик сабмита
  const handleSubmit = async (values: CreateProductInput) => {
    if (productId) {
      await updateMutation.mutateAsync({
        id: productId,
        ...values,
      })
    } else {
      await createMutation.mutateAsync(values)
    }
  }

  return {
    product,
    isLoading: isLoadingProduct || createMutation.isPending || updateMutation.isPending,
    handleSubmit,
  }
}
