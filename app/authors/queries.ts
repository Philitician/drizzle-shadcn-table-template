"server-only";

import { db } from "~/db";
import { authors } from "~/db/schemas";

export const getAuthors = async () => {
  return db
    .select({
      id: authors.id,
      name: authors.name,
    })
    .from(authors);
};

export type AuthorRow = Awaited<ReturnType<typeof getAuthors>>[number];
