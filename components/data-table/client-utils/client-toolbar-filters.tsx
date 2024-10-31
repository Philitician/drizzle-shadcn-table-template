"use client";

import type { Table } from "@tanstack/react-table";
import type { ClientFilterableColumn } from "./types";
import { DataTableClientFilter } from "./client-filter";
import { DataTableClientDateFilter } from "./client-date-filter";

type DataTableClientToolbarFiltersProps<TData> = {
  table: Table<TData>;
  filters: ClientFilterableColumn<TData>[];
  columnLabels: Partial<Record<keyof TData, string>>;
};

export function DataTableClientToolbarFilters<TData>({
  table,
  filters,
  columnLabels,
}: DataTableClientToolbarFiltersProps<TData>) {
  return (
    <div className="flex gap-2">
      {filters.map(({ id, type }) => {
        const idString = String(id);
        const column = table.getColumn(idString);
        const title = columnLabels[id];
        if (!column || !title) return null;
        return (
          <>
            {type === "select" && (
              <DataTableClientFilter
                key={idString}
                column={column}
                title={title}
              />
            )}
            {type === "date" && (
              <DataTableClientDateFilter
                key={idString}
                column={column}
                title={title}
              />
            )}
          </>
        );
      })}
    </div>
  );
}
