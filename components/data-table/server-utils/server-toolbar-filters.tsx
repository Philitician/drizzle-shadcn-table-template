import { DataTableServerDateFilter } from "./server-date-filter";
import { DataTableServerFilter } from "./server-filter";

import type { ServerFilterableColumn } from "./types";

type DataTableServerToolbarFiltersProps<TData> = {
  filters: ServerFilterableColumn<TData>[];
};

export function DataTableServerToolbarFilters<TData>({
  filters,
}: DataTableServerToolbarFiltersProps<TData>) {
  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <>
          {filter.type === "select" && (
            <DataTableServerFilter key={filter.id} {...filter} />
          )}
          {filter.type === "date" && (
            <DataTableServerDateFilter key={filter.id} {...filter} />
          )}
        </>
      ))}
    </div>
  );
}
