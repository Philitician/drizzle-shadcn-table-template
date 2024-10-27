"use client";

import { type Table } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { X, Search } from "lucide-react";

type DataTableSearchProps<TData> = {
  table: Table<TData>;
  globalFilter: string;
  placeholder?: string;
  className?: string;
};

/**
 * Filter input search for shadcn (tanstack) table. See filtering at https://ui.shadcn.com/docs/components/data-table for more info about table setup.
 * @param table DataTable
 * @param globalFilter current column to filter on. Needs to be controlled by a useState in DataTable
 * @param placeholder placeholder text for input
 */
export function DataTableClientSearch<TData>({
  table,
  globalFilter,
  placeholder,
  className,
}: DataTableSearchProps<TData>) {
  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        value={globalFilter}
        /* Ensure useState is properly set in DataTable to enable changing state; 
        see filterting: https://ui.shadcn.com/docs/components/data-table */
        onChange={(event) => table.setGlobalFilter(String(event.target.value))}
        className={cn(
          "border-lg h-10 w-full border-border text-sm shadow-sm md:w-[26.25rem]",
          className,
        )}
      />
      {Boolean(globalFilter) && (
        <div className="absolute inset-y-0 right-10">
          <Button
            size="icon"
            variant="ghost"
            type="button"
            aria-label="Clear"
            className="text-gray-600"
            onClick={() => table.setGlobalFilter("")}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
      <div className="absolute inset-y-0 right-4 flex items-center">
        <Search className="text-icon-muted h-5 w-5" />
      </div>
    </div>
  );
}
