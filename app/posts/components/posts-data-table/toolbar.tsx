import { Table } from "@tanstack/react-table";
import { DataTableColumnsVisibility } from "~/components/data-table/client-utils/data-table-column-visibility";
import type { ServerFilterProps } from "~/components/data-table/server-utils/server-filter";
import { ServerFilter } from "~/components/data-table/server-utils/server-filter";
import { DataTableServerSearch } from "~/components/data-table/server-utils/server-search";
import { POST_STATUSES } from "~/db/schemas/posts/constants";
import { AuthorInfo } from "../../_queries";
import { PostRow } from "../../queries";
import { columnLabels } from "./columns";

const CONSTANT_FILTERS: ServerFilterProps[] = [
  {
    filterKey: "status",
    label: "Status",
    options: POST_STATUSES.map((status) => ({
      value: status,
      label: status,
    })),
  },
];

type PostsDataTableToolbarProps = {
  table: Table<PostRow>;
  authors: AuthorInfo[];
};

export function PostsDataTableToolbar({
  table,
  authors,
}: PostsDataTableToolbarProps) {
  const filters = [
    ...CONSTANT_FILTERS,
    {
      filterKey: "authorId",
      label: "Author",
      options: authors.map((author) => ({
        value: author.id.toString(),
        label: author.name,
      })),
    },
  ];
  return (
    <div className="flex items-center justify-between">
      <DataTableServerSearch placeholder="Search posts..." className="w-80" />
      <div className="flex gap-2">
        {filters.map((filter) => (
          <ServerFilter key={filter.filterKey} {...filter} />
        ))}
      </div>
      <DataTableColumnsVisibility
        table={table}
        title="Columns"
        columnLabels={columnLabels}
        keepOpenOnSelect
      />
    </div>
  );
}
