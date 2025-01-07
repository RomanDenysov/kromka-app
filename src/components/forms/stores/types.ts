import type { z } from 'zod'
import type { createStoreSchema } from '~/server/api/routers/stores/validator'
import type { DBStore } from '~/server/types/store'

export type CreateStoreInput = z.infer<typeof createStoreSchema>
export type Store = Partial<DBStore>
