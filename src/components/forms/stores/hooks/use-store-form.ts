import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { createStoreSchema } from '~/server/api/routers/stores/validator'
import type { CreateStoreInput, Store } from '../types'

export const useStoreForm = (store?: Store) => {
  const defaultValues = useMemo(
    () => ({
      id: store?.id || '',
      name: store?.name || '',
      slug: store?.slug || '',
      address: store?.address || {
        street: '',
        city: '',
        zip: '',
      },
      addressUrl: store?.addressUrl || '',
      workingHours: store?.workingHours || {
        week: '',
        saturday: '',
        sunday: '',
      },
      isVisible: store?.isVisible ?? true,
      sortOrder: store?.sortOrder || 0,
    }),
    [store],
  )

  const form = useForm<CreateStoreInput>({
    resolver: zodResolver(createStoreSchema),
    defaultValues,
  })

  return form
}
