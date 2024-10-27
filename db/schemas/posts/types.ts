import { z } from "zod";
import { posts } from ".";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const postSchema = createSelectSchema(posts);
export const newPostSchema = createInsertSchema(posts, {
  authorId: z.coerce.number(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
