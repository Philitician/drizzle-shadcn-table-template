"use client";

import type { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

type DataTableToggleColumnsProps<TData> = {
  table: Table<TData>;
  title: string;
  columnLabels: Record<string, string>;
  keepOpenOnSelect?: boolean;
};

export function DataTableColumnsVisibility<TData>({
  table,
  title,
  columnLabels,
  keepOpenOnSelect,
}: DataTableToggleColumnsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="font-normal">
          {title} <ChevronDown className="stroke-icon-muted ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="max-h-80 overflow-y-auto">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide() && columnLabels[column.id])
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  column.toggleVisibility(!!value);
                }}
                onSelect={(event) => {
                  if (keepOpenOnSelect) {
                    event.preventDefault();
                  }
                }}
              >
                {columnLabels[column.id]}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
