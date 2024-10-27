import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { authors } from ".";

export const authorSchema = createSelectSchema(authors);
export const newAuthorSchema = createInsertSchema(authors);

export type Author = typeof authors.$inferSelect;
export type NewAuthor = typeof authors.$inferInsert;
