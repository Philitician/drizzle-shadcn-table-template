import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";
import { POST_STATUSES } from "~/db/schemas/posts/constants";

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  sortBy: parseAsString.withDefault("title"),
  order: parseAsStringLiteral(["asc", "desc"]).withDefault("asc"),
  query: parseAsString.withDefault(""),
  status: parseAsStringLiteral(POST_STATUSES),
  authorId: parseAsInteger,
};

export const postsSearchParamsCache = createSearchParamsCache(searchParams);
