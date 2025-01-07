import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createStoreSchema } from '~/server/api/routers/stores/validator'
import type { CreateStoreInput, Store } from '../types'

export const useStoreForm = (store?: Store) => {
  const form = useForm<CreateStoreInput>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
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
    },
  })

  return form
}
