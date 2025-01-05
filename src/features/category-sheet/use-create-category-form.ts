import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { createCategoryValidator } from '~/server/api/routers/categories/validator'
import { api } from '~/trpc/react'

type CreateCategoryFormValues = z.infer<typeof createCategoryValidator>
const defaultValues: CreateCategoryFormValues = {
  name: '',
  slug: '',
  description: '',
  isVisible: true,
  allowsDelivery: false,
}
export const useCreateCategoryForm = () => {
  const utils = api.useUtils()
  const createCategoryMutation = api.categories.create.useMutation({
    onSuccess: () => {
      utils.categories.invalidate()
      console.log('Category created')
    },
    onError: () => {
      console.log('Error creating category')
    },
  })

  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategoryValidator),
    defaultValues,
  })

  const onSubmit = async (values: CreateCategoryFormValues) => {
    await createCategoryMutation.mutateAsync(values)
  }

  return {
    form,
    onSubmit,
    isLoading: createCategoryMutation.isPending,
  }
}
