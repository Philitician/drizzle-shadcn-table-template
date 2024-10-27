import { type Table } from "@tanstack/react-table";
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

import { Button } from "~/components/ui/button";

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
};

/**
 * Shows pagination controls. Ensure pagination is enabled on the table.
 * @param table DataTable with pagination enabled
 */
export function DataTableClientPagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between gap-6 px-6 lg:gap-8">
      <div className="flex items-center gap-4">
        <p className="text-sm font-medium text-muted-foreground">
          Rader per side:
        </p>
        <Select
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[4.5rem]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 25, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <RowAndPageCountDetails table={table} />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Gå til første side</span>
          <ChevronFirst className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Gå til forrige side</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Gå til neste side</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Gå til siste side</span>
          <ChevronLast className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function RowAndPageCountDetails<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const { rows } = table.getSortedRowModel();
  const totalRows = rows.length;
  const firstRow = pageIndex * pageSize + 1;
  const lastRow = Math.min(firstRow + pageSize - 1, totalRows);
  return (
    <div className="flex items-center justify-center text-sm font-medium text-muted-foreground">
      {firstRow}-{lastRow} av {totalRows}
    </div>
  );
}
