import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const task = sqliteTable('task', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

export const churchSignupRequest = sqliteTable('church_signup_request', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	applicantName: text('applicant_name').notNull(),
	applicantEmail: text('applicant_email').notNull(),
	phone: text('phone').notNull(),
	churchName: text('church_name').notNull(),
	role: text('role').notNull(),
	denomination: text('denomination'),
	website: text('website'),
	note: text('note'),
	status: text('status').notNull().default('pending'),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull()
});

export * from './auth.schema';
