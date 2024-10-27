"use client";

import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { parseAsInteger, useQueryState } from "nuqs";
import { Button } from "~/components/ui/button";

type DataTableServerPaginationProps = {
  rowCount: number;
  pageSizes?: number[];
  defaultLimit?: number;
};

/**
 * Shows pagination controls. Ensure pagination is enabled on the table.
 * @param table DataTable with pagination enabled
 */
export function DataTableServerPagination({
  rowCount,
  pageSizes = [10, 25, 50],
  defaultLimit = 10,
}: DataTableServerPaginationProps) {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(defaultLimit).withOptions({ shallow: false }),
  );
  const pageCount = Math.ceil(rowCount / limit);
  return (
    <div className="flex items-center justify-between gap-6 px-6 lg:gap-8">
      <div className="flex items-center gap-4">
        <p className="text-sm font-medium text-muted-foreground">
          Rader per side:
        </p>
        <Select
          value={limit.toString()}
          onValueChange={(value) => {
            setLimit(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[4.5rem]">
            <SelectValue placeholder={limit.toString()} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizes.map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <RowAndPageCountDetails page={page} limit={limit} rowCount={rowCount} />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          <span className="sr-only">Gå til første side</span>
          <ChevronFirst className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <span className="sr-only">Gå til forrige side</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => setPage(page + 1)}
          disabled={page === pageCount}
        >
          <span className="sr-only">Gå til neste side</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => setPage(pageCount - 1)}
          disabled={page === pageCount}
        >
          <span className="sr-only">Gå til siste side</span>
          <ChevronLast className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function RowAndPageCountDetails({
  page,
  limit,
  rowCount,
}: {
  page: number;
  limit: number;
  rowCount: number;
}) {
  const firstRow = (page - 1) * limit + 1;
  const lastRow = Math.min(firstRow + limit - 1, rowCount);
  return (
    <div className="flex items-center justify-center text-sm font-medium text-muted-foreground">
      {firstRow}-{lastRow} av {rowCount}
    </div>
  );
}
