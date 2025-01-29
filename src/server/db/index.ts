import 'server-only';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '~/env';
import { log } from '~/lib/utils/log';
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as schema from './schema';

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  log.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const db = drizzle(pool, {
  schema,
});
