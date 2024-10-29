import { ColumnDef } from "@tanstack/react-table";
import { DataTableServerColumnHeader } from "~/components/data-table/server-utils/server-column-header";
import type { AuthorRow } from "../queries";

export const columns: ColumnDef<AuthorRow>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableServerColumnHeader column={column} title="Navn" />
    ),
    enableSorting: true,
  },
];
