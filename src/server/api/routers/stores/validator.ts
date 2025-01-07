import { z } from 'zod'

export const idSchema = z.object({
  id: z.string().min(1, 'ID обязателен'),
})

const addressSchema = z.object({
  street: z.string().min(1, 'Улица обязательна'),
  city: z.string().min(1, 'Город обязательный'),
  zip: z.string().min(1, 'Почтовый индекс обязателен'),
})

const workingHoursSchema = z.object({
  week: z.string().min(1, 'День работы обязателен'),
  saturday: z.string().min(1, 'Суббота обязательна'),
  sunday: z.string().min(1, 'Воскресенье обязательно'),
})

export const createStoreSchema = z.object({
  name: z.string().min(1, 'Название магазина обязательно'),
  slug: z.string().min(1, 'Slug обязателен'),
  address: addressSchema,
  addressUrl: z.string().url().min(1, 'URL адреса обязателен'),
  workingHours: workingHoursSchema,
  sortOrder: z.number().int().nonnegative(),
  isVisible: z.boolean().default(true),
})

export const updateStoreSchema = createStoreSchema.partial().merge(idSchema)
