import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

export const searchParams = {
  sortBy: parseAsString.withDefault("name"),
  order: parseAsStringLiteral(["asc", "desc"]).withDefault("asc"),
};

export const authorsSearchParamsCache = createSearchParamsCache(searchParams);
