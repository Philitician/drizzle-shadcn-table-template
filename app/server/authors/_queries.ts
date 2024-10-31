"server-only";

import { db } from "~/db";
import { authors } from "~/db/schemas";
import { authorsSearchParamsCache } from "./search-params";
import { asc, desc } from "drizzle-orm";
import type { Author } from "~/db/schemas/authors/types";

export const getAuthors = async () => {
  const { sortBy, order } = authorsSearchParamsCache.all();
  const sortByColumn = authors[sortBy as keyof Author];
  return db
    .select({
      id: authors.id,
      name: authors.name,
    })
    .from(authors)
    .orderBy(order === "asc" ? asc(sortByColumn) : desc(sortByColumn));
};

export type AuthorRow = Awaited<ReturnType<typeof getAuthors>>[number];
