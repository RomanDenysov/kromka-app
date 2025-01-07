'use client'

import { toast } from '~/hooks/use-toast'
import { api } from '~/trpc/react'
import type { CreateProductInput } from '../types'

export const useProductOperations = (productId?: string) => {
  const utils = api.useUtils()

  const { data: product, isLoading: isLoadingProduct } = api.products.byId.useQuery(
    { id: productId || '' },
    {
      enabled: !!productId && productId !== 'new', // Запрос выполнится только если есть productId
    },
  )

  const createMutation = api.products.create.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Product created successfully',
      })
      utils.products.invalidate()
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const updateMutation = api.products.update.useMutation({
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Product updated successfully',
      })
      utils.products.invalidate()
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const handleSubmit = async (values: CreateProductInput) => {
    try {
      if (!productId || productId === 'new') {
        await createMutation.mutateAsync(values)
      } else {

        await updateMutation.mutateAsync({
          id: productId,
          ...values,
        })
      }
    } catch (error) {
      console.error('Submit error:', error)
    }
  }

  return {
    product,
    isLoading: isLoadingProduct || createMutation.isPending || updateMutation.isPending,
    handleSubmit,
  }
}
