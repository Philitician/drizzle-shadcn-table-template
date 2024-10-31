"use client";

import type { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { DataTableColumnsVisibility } from "~/components/data-table/client-utils/column-visibility";
import { DataTableServerSearch } from "~/components/data-table/server-utils/server-search";
import { DataTableServerToolbarFilters } from "~/components/data-table/server-utils/server-toolbar-filters";
import { POST_STATUSES } from "~/db/schemas/posts/constants";
import type { AuthorInfo, PostRow } from "../../_queries";
import { columnLabels } from "./columns";
import type { ServerFilterableColumn } from "~/components/data-table/server-utils/types";

type PostsDataTableToolbarProps = {
  table: Table<PostRow>;
  authors: AuthorInfo[];
};

export function PostsDataTableToolbar({
  table,
  authors,
}: PostsDataTableToolbarProps) {
  const filters = useMemo(
    () =>
      [
        {
          id: "status",
          label: "Status",
          type: "select",
          options: POST_STATUSES.map((status) => ({
            value: status,
            label: status,
          })),
        },
        {
          id: "author.id",
          label: "Author",
          type: "select",
          options: authors.map((author) => ({
            value: author.id.toString(),
            label: author.name,
          })),
        },
        {
          id: "createdAt",
          label: "Created At",
          type: "date",
        },
      ] satisfies ServerFilterableColumn<PostRow>[],
    [authors],
  );

  return (
    <div className="flex items-center justify-between">
      <DataTableServerSearch placeholder="Search posts..." className="w-80" />
      <DataTableServerToolbarFilters<PostRow> filters={filters} />
      <DataTableColumnsVisibility
        table={table}
        title="Columns"
        columnLabels={columnLabels}
        keepOpenOnSelect
      />
    </div>
  );
}
