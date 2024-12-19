import 'server-only'

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '~/db/schema'
import { env } from '~/env'

const client = neon(env.DATABASE_URL)
export const db = drizzle({ client, schema })
