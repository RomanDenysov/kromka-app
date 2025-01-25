'use client'

import { toast } from '~/hooks/use-toast'
import { api } from '~/trpc/react'
import type { CreateProductInput } from '../types'

export const useProductOperations = () => {
  const utils = api.useUtils()

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

  const handleSubmit = async (values: CreateProductInput) =>
    await createMutation.mutateAsync(values)

  return {
    isLoading: createMutation.isPending || updateMutation.isPending,
    handleSubmit,
  }
}
