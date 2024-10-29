"use client";

import {
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { use, useState } from "react";
import { DataTableBase } from "~/components/data-table/client-utils/data-table-base";
import { DataTableServerPagination } from "~/components/data-table/server-utils/server-pagination";
import { AuthorInfo } from "../../_queries";
import type { PostsResult } from "../../queries";
import { columns } from "./columns";
import { PostsDataTableToolbar } from "./toolbar";

type PostsDataTableProps = {
  dataPromise: Promise<PostsResult>;
  authors: AuthorInfo[];
};

export function PostsDataTable({ dataPromise, authors }: PostsDataTableProps) {
  const { data, totalCount } = use(dataPromise);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <div className="flex flex-col gap-2">
      <PostsDataTableToolbar table={table} authors={authors} />
      <DataTableBase table={table} columnLength={columns.length - 1} />
      <DataTableServerPagination rowCount={totalCount} />
    </div>
  );
}
