/* eslint-disable @typescript-eslint/no-explicit-any */
import { rankItem } from "@tanstack/match-sorter-utils";
import type { FilterFn } from "@tanstack/react-table";
import { format, parse } from "date-fns";

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value as string);

  // Store the itemRank info
  addMeta({ itemRank });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

type DateFormat = "dd.MM.yyyy" | "yyyy-MM-dd";

export const dateRangeFilter: FilterFn<any> = (
  row,
  columnId,
  filterValues: [string, string],
) => {
  console.log("dateRangeFilter", filterValues);
  const dateString = row.getValue<string>(columnId);
  if (!dateString) return false;

  const [from, to] = filterValues;

  // Detect input format and parse accordingly
  const isEuropeanFormat = dateString.includes(".");
  const inputFormat: DateFormat = isEuropeanFormat
    ? "dd.MM.yyyy"
    : "yyyy-MM-dd";

  // Parse the row date
  const rowDate = parse(dateString, inputFormat, new Date());

  // Format all dates to ISO for comparison
  const formattedRowDate = format(rowDate, "yyyy-MM-dd");
  const fromDate = from ? format(new Date(from), "yyyy-MM-dd") : null;
  const toDate = to ? format(new Date(to), "yyyy-MM-dd") : null;

  return (
    (!fromDate || formattedRowDate >= fromDate) &&
    (!toDate || formattedRowDate <= toDate)
  );
};
