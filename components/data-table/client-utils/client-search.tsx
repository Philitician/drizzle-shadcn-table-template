"use client";

import { type Table } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { X, Search } from "lucide-react";
import { useRef } from "react";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const setFocusToInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div
        className="absolute inset-y-0 left-3 flex items-center"
        onClick={setFocusToInput}
      >
        <Search size={20} className="text-muted-foreground" />
      </div>
      <Input
        ref={inputRef}
        placeholder={placeholder ?? "Søk..."}
        value={globalFilter}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        className={cn("pl-10", className)}
      />
      {Boolean(globalFilter) && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <Button
            size="icon"
            variant="ghost"
            type="button"
            aria-label="Clear"
            onClick={() => table.setGlobalFilter("")}
          >
            <X className="text-icon" />
          </Button>
        </div>
      )}
    </div>
  );
}
