import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { idField, timestamps } from '../helpers';
import { staffRole } from './enums';

const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  isAnonymous: boolean('is_anonymous'),
  ...timestamps,
});

const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  ...timestamps,
});

const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  ...timestamps,
});

const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

const staff = pgTable(
  'staff',
  {
    ...idField,
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' })
      .unique(),
    role: staffRole('role').notNull(),
    isActive: boolean('is_active').default(true),
    ...timestamps,
  },
  (table) => ({
    // Индекс для быстрого поиска по userId
    userIdIdx: index('staff_user_id_idx').on(table.userId),
    // Уникальный индекс для userId, так как у нас unique constraint
    userIdUnique: uniqueIndex('staff_user_id_unique').on(table.userId),
    // Составной индекс для частых запросов по userId + isActive
    userActiveIdx: index('staff_user_active_idx').on(
      table.userId,
      table.isActive
    ),
  })
);

const staffRelations = relations(staff, ({ one }) => ({
  user: one(users, {
    fields: [staff.userId],
    references: [users.id],
  }),
}));
export { account, session, staff, staffRelations, users, verification };
