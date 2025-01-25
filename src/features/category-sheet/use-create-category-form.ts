import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { log } from '~/lib/utils/log'
import { createCategoryValidator } from '~/server/api/routers/categories/validator'
import { api } from '~/trpc/react'
import { useCategorySheet } from './use-category-sheet'

type CreateCategoryFormValues = z.infer<typeof createCategoryValidator>

const defaultValues: CreateCategoryFormValues = {
  name: '',
  slug: '',
  description: '',
  isVisible: true,
  sortOrder: 0,
  allowsDelivery: false,
}
export const useCreateCategoryForm = () => {
  const utils = api.useUtils()
  const onClose = useCategorySheet((state) => state.onClose)
  const onSuccessCallback = useCategorySheet((state) => state.onSuccessCallback)

  const createCategoryMutation = api.categories.create.useMutation({
    onSuccess: (data) => {
      utils.categories.getAll.invalidate()
      onSuccessCallback?.(data.id)
      onClose()
      log.info('Category created')
    },
    onError: () => {
      log.info('Error creating category')
    },
  })

  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategoryValidator),
    defaultValues,
  })

  const onSubmit = async (values: CreateCategoryFormValues) =>
    await createCategoryMutation.mutateAsync(values)

  return {
    form,
    onSubmit,
    isLoading: createCategoryMutation.isPending,
  }
}
