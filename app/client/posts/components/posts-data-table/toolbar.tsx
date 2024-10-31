"use client";

import type { Table } from "@tanstack/react-table";
import { DataTableClientSearch } from "~/components/data-table/client-utils/client-search";
import { DataTableColumnsVisibility } from "~/components/data-table/client-utils/column-visibility";
import type { AuthorInfo, PostRow } from "../../_queries";
import { columnLabels } from "./columns";
import { DataTableClientToolbarFilters } from "~/components/data-table/client-utils/client-toolbar-filters";

type PostsDataTableToolbarProps = {
  table: Table<PostRow>;
  globalFilter: string;
  authors: AuthorInfo[];
};

export function PostsDataTableToolbar({
  table,
  globalFilter,
}: PostsDataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <DataTableClientSearch
        table={table}
        globalFilter={globalFilter}
        placeholder="Search posts..."
        className="w-80"
      />
      <DataTableClientToolbarFilters
        table={table}
        filters={[
          {
            id: "status",
            type: "select",
          },
          {
            id: "authorName",
            type: "select",
          },
          {
            id: "createdAt",
            type: "date",
          },
        ]}
        columnLabels={columnLabels}
      />
      <DataTableColumnsVisibility
        table={table}
        title="Columns"
        columnLabels={columnLabels}
        keepOpenOnSelect
      />
    </div>
  );
}
