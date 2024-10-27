"server-only";

import { format } from "date-fns";
import { and, asc, count, desc, eq, ilike, or, SQL } from "drizzle-orm";
import { match } from "ts-pattern";
import { db } from "~/db";
import { authors } from "~/db/schemas/authors";
import type { Author } from "~/db/schemas/authors/types";
import { posts } from "~/db/schemas/posts";
import type { Post } from "~/db/schemas/posts/types";
import { postsSearchParamsCache } from "./search-params";

const getSortByColumn = (sortBy: string) => {
  const [tableName, columnName] = sortBy.split(".");
  return match(tableName)
    .with("author", () => authors[columnName as keyof Author])
    .otherwise(() => posts[sortBy as keyof Post]);
};

export const getPostRows = async () => {
  const { page, limit, sortBy, order, query, status, authorId } =
    postsSearchParamsCache.all();
  const where = [
    or(
      ilike(posts.title, `%${query}%`).if(query),
      ilike(authors.name, `%${query}%`).if(query),
    ),
    eq(posts.status, status!).if(status),
    eq(posts.authorId, authorId!).if(authorId),
  ];
  const sortByColumn = getSortByColumn(sortBy);
  const orderBy = order === "asc" ? asc(sortByColumn) : desc(sortByColumn);
  const offset = (page - 1) * limit;

  const [totalCount, data] = await Promise.all([
    getPostsTotalCount(where),
    getPostRowData({ limit, offset, where, orderBy }),
  ]);
  return {
    totalCount,
    data: data.map((row) => ({
      ...row,
      createdAt: format(row.createdAt, "dd.MM.yyyy"),
    })),
  };
};

const getPostsTotalCount = async (where: (SQL<unknown> | undefined)[]) => {
  return db
    .select({
      count: count(),
    })
    .from(posts)
    .innerJoin(authors, eq(posts.authorId, authors.id))
    .where(and(...where))
    .then(([row]) => row?.count ?? 0);
};

type GetPostsParams = {
  limit: number;
  offset: number;
  where: (SQL<unknown> | undefined)[];
  orderBy: SQL;
};

const getPostRowData = async ({
  limit,
  offset,
  where,
  orderBy,
}: GetPostsParams) => {
  return db
    .select({
      id: posts.id,
      title: posts.title,
      status: posts.status,
      publishedAt: posts.publishedAt,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      author: {
        name: authors.name,
      },
    })
    .from(posts)
    .innerJoin(authors, eq(posts.authorId, authors.id))
    .where(and(...where))
    .limit(limit)
    .offset(offset)
    .orderBy(orderBy);
};

export type PostsResult = Awaited<ReturnType<typeof getPostRows>>;
export type PostRow = PostsResult["data"][number];
