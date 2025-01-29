import { createId } from '@paralleldrive/cuid2';
import { boolean, integer, text, timestamp } from 'drizzle-orm/pg-core';

const idField = {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
};

const timestamps = {
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
  createdAt: timestamp('created_at').defaultNow(),
};

const sortAndVisibility = {
  sortOrder: integer('sort_order').default(0),
  isVisible: boolean('is_visible').default(true),
};

export { sortAndVisibility, timestamps, idField };
