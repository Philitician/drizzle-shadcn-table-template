import type { ColumnDef } from "@tanstack/react-table";
import { DataTableClientColumnHeader } from "~/components/data-table/client-utils/client-column-header";
import type { AuthorRow } from "../_queries";

export const columns: ColumnDef<AuthorRow>[] = [
  {
    accessorKey: "id",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableClientColumnHeader column={column} title="Navn" />
    ),
    enableSorting: true,
  },
];
