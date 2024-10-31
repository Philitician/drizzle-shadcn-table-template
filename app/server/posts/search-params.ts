import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  parseAsArrayOf,
  parseAsIsoDateTime,
} from "nuqs/server";

import { POST_STATUSES } from "~/db/schemas/posts/constants";

export const createdAtDateRange = {
  createdAtStartDate: parseAsIsoDateTime,
  createdAtEndDate: parseAsIsoDateTime,
};

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  sortBy: parseAsString.withDefault("title"),
  order: parseAsStringLiteral(["asc", "desc"]).withDefault("asc"),
  query: parseAsString.withDefault(""),
  status: parseAsArrayOf(parseAsStringLiteral(POST_STATUSES)),
  "author.id": parseAsArrayOf(parseAsInteger),
  ...createdAtDateRange,
};

export const postsSearchParamsCache = createSearchParamsCache(searchParams);
