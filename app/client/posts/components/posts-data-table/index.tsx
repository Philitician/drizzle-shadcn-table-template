"use client";

import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { use, useState } from "react";
import { DataTableBase } from "~/components/data-table/base";
import { DataTableClientPagination } from "~/components/data-table/client-utils/client-pagination";
import type { AuthorInfo } from "../../_queries";
import type { PostRow } from "../../_queries";
import { columns } from "./columns";
import { PostsDataTableToolbar } from "./toolbar";
import {
  dateRangeFilter,
  fuzzyFilter,
} from "~/components/data-table/client-utils/client-filter-functions";

type PostsDataTableProps = {
  dataPromise: Promise<PostRow[]>;
  authors: AuthorInfo[];
};

export function PostsDataTable({ dataPromise, authors }: PostsDataTableProps) {
  const data = use(dataPromise);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      dateRangeFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
  });

  return (
    <div className="flex flex-col gap-2">
      <PostsDataTableToolbar
        table={table}
        authors={authors}
        globalFilter={globalFilter}
      />
      <DataTableBase table={table} columnLength={columns.length - 1} />
      <DataTableClientPagination table={table} />
    </div>
  );
}
