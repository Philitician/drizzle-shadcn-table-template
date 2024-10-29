import type { ColumnDef } from "@tanstack/react-table";
import { DataTableServerColumnHeader } from "~/components/data-table/server-utils/server-column-header";
import type { PostRow } from "../../queries";

export const columnLabels = {
  title: "Title",
  status: "Status",
  author: "Author",
  createdAt: "Created",
};

export const columns: ColumnDef<PostRow>[] = [
  {
    id: "id",
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableServerColumnHeader column={column} title={columnLabels.title} />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableServerColumnHeader
        column={column}
        title={columnLabels.status}
      />
    ),
    enableSorting: true,
  },
  {
    id: "author.name",
    accessorKey: "author.name",
    header: ({ column }) => (
      <DataTableServerColumnHeader
        column={column}
        title={columnLabels.author}
      />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableServerColumnHeader
        column={column}
        title={columnLabels.createdAt}
      />
    ),
    enableSorting: true,
  },
  // {
  //   id: "actions",
  //   header: () => null,
  //   cell: ({ row }) => <div>{row.original.id}</div>,
  // },
];
