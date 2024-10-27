import type { ColumnDef } from "@tanstack/react-table";
import { DataTableServerColumnHeader } from "~/components/data-table/server-utils/server-column-header";
import type { PostRow } from "../../queries";
export const columns: ColumnDef<PostRow>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableServerColumnHeader column={column} title="Title" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableServerColumnHeader column={column} title="Status" />
    ),
    enableSorting: true,
  },
  {
    id: "author.name",
    accessorKey: "author.name",
    header: ({ column }) => (
      <DataTableServerColumnHeader column={column} title="Author" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableServerColumnHeader column={column} title="Created" />
    ),
    enableSorting: true,
  },
];
