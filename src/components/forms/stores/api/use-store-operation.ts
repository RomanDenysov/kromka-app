'use client'

import { toast } from '~/hooks/use-toast'
import { api } from '~/trpc/react'
import type { CreateStoreInput } from '../types'

export const useStoreOperations = (storeId?: string) => {
  const utils = api.useUtils()

  const { data: store, isLoading: isLoadingStore } = api.stores.byId.useQuery(
    { id: storeId || '' },
    {
      enabled: !!storeId, // Запрос выполнится только если есть storeId
    },
  )

  // Мутации
  const createMutation = api.stores.create.useMutation({
    onSuccess: () => {
      toast({
        title: 'Store created',
        description: 'Store created successfully',
      })
      utils.stores.invalidate()
    },
  })

  const updateMutation = api.stores.update.useMutation({
    onSuccess: () => {
      toast({
        title: 'Store updated',
        description: 'Store updated successfully',
      })
      utils.stores.invalidate()
    },
  })

  // Обработчик сабмита
  const handleSubmit = async (values: CreateStoreInput) => {
    console.log('Submitting values:', values)
    try {
      if (storeId) {
        await updateMutation.mutateAsync({
          id: storeId,
          ...values,
        })
      } else {
        await createMutation.mutateAsync(values)
      }
    } catch (error) {
      console.error('Submit error:', error)
    }
  }

  return {
    store,
    isLoading: isLoadingStore || createMutation.isPending || updateMutation.isPending,
    handleSubmit,
  }
}
