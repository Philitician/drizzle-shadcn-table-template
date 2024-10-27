import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function DataTableClientColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("text flex items-center gap-2", className)}>
      <Button
        aria-label={
          column.getIsSorted() === "desc"
            ? `Sortert synkende. Klikk for å sortere stigende.`
            : column.getIsSorted() === "asc"
              ? `Sortert stigende. Klikk for å sortere synkende.`
              : `Ikke sortert. Klikk for å sortere synkende.`
        }
        variant="ghost"
        size="sm"
        className="-ml-3 flex h-8 gap-2 data-[state=open]:bg-accent"
        onClick={(e) => {
          column.toggleSorting();
          e.preventDefault();
        }}
      >
        <span>{title}</span>
        {column.getIsSorted() === "desc" ? (
          <ArrowDown className="text-icon h-4 w-4" aria-hidden="true" />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUp className="text-icon h-4 w-4" aria-hidden="true" />
        ) : (
          <ChevronsUpDown className="text-icon h-4 w-4" aria-hidden="true" />
        )}
      </Button>
    </div>
  );
}
