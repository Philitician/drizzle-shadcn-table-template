"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { use } from "react";
import { DataTableBase } from "~/components/data-table/client-utils/data-table-base";
import { DataTableServerPagination } from "~/components/data-table/server-utils/server-pagination";
import type { PostsResult } from "../../queries";
import { columns } from "./columns";

type PostsDataTableProps = {
  dataPromise: Promise<PostsResult>;
};

export function PostsDataTable({ dataPromise }: PostsDataTableProps) {
  const { data, totalCount } = use(dataPromise);
  console.log(totalCount);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: { id: false },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-2">
      <DataTableBase table={table} columnLength={columns.length - 1} />
      <DataTableServerPagination rowCount={totalCount} />
    </div>
  );
}
