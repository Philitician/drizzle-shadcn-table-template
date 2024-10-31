"use client";

import {
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "./columns";
import type { AuthorRow } from "../_queries";
import { use, useState } from "react";
import { DataTableBase } from "~/components/data-table/base";

type AuthorsDataTableProps = {
  dataPromise: Promise<AuthorRow[]>;
};

export function AuthorsDataTable({ dataPromise }: AuthorsDataTableProps) {
  const data = use(dataPromise);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <DataTableBase
      table={table}
      columnLength={columns.length}
      rowNavigationBy="id"
      colorOddRows
      tableHeadCellClassName="px-2"
    />
  );
}
