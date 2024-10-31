"server-only";

import { eq } from "drizzle-orm";
import { db } from "~/db";
import { authors } from "~/db/schemas";
import { posts } from "~/db/schemas/posts";
import { dateFormatter } from "~/lib/date-utils";

export const getPostRows = async () => {
  const data = await db
    .select({
      id: posts.id,
      title: posts.title,
      status: posts.status,
      createdAt: posts.createdAt,
      authorName: authors.name,
    })
    .from(posts)
    .innerJoin(authors, eq(posts.authorId, authors.id));
  return data.map((row) => ({
    ...row,
    createdAt: dateFormatter.date(row.createdAt),
  }));
};

export type PostRow = Awaited<ReturnType<typeof getPostRows>>[number];

export const getAuthors = async () => {
  return db.select({ id: authors.id, name: authors.name }).from(authors);
};

export type AuthorInfo = Awaited<ReturnType<typeof getAuthors>>[number];
