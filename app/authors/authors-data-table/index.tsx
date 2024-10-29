"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DataTableBase } from "~/components/data-table/client-utils/data-table-base";
import { columns } from "./columns";
import type { AuthorRow } from "../queries";
import { use } from "react";

type AuthorsDataTableProps = {
  dataPromise: Promise<AuthorRow[]>;
};

export function AuthorsDataTable({ dataPromise }: AuthorsDataTableProps) {
  const data = use(dataPromise);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
