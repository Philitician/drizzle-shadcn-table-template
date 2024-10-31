import type { ColumnDef } from "@tanstack/react-table";
import { DataTableClientColumnHeader } from "~/components/data-table/client-utils/client-column-header";
import type { PostRow } from "../../_queries";

export const columnLabels = {
  title: "Title",
  status: "Status",
  authorName: "Author",
  createdAt: "Created",
} as const;

export const columns: ColumnDef<PostRow>[] = [
  {
    id: "id",
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableClientColumnHeader column={column} title={columnLabels.title} />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableClientColumnHeader
        column={column}
        title={columnLabels.status}
      />
    ),
    enableSorting: true,
    filterFn: "arrIncludesSome",
  },
  {
    id: "authorName",
    accessorKey: "authorName",
    header: ({ column }) => (
      <DataTableClientColumnHeader
        column={column}
        title={columnLabels.authorName}
      />
    ),
    enableSorting: true,
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableClientColumnHeader
        column={column}
        title={columnLabels.createdAt}
      />
    ),
    enableSorting: true,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    filterFn: "dateRangeFilter" as any,
  },
  // {
  //   id: "actions",
  //   header: () => null,
  //   cell: ({ row }) => <div>{row.original.id}</div>,
  // },
];
