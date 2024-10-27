import type { Column } from "@tanstack/react-table";
import { match } from "ts-pattern";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type DataTableServerColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function DataTableServerColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableServerColumnHeaderProps<TData, TValue>) {
  const [sortBy, setSortBy] = useQueryState("sortBy", { shallow: false });
  const [order, setOrder] = useQueryState(
    "order",
    parseAsStringLiteral(["asc", "desc"]).withOptions({ shallow: false }),
  );

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const columnOrderResult = match({ sort: sortBy, order: order })
    .with({ sort: column.id, order: "asc" }, () => "asc" as const)
    .with({ sort: column.id, order: "desc" }, () => "desc" as const)
    .otherwise(() => null);

  return (
    <div className={cn("text flex items-center gap-2", className)}>
      <Button
        aria-label={
          columnOrderResult === "asc"
            ? `Sortert stigende. Klikk for å sortere synkende.`
            : columnOrderResult === "desc"
              ? `Sortert synkende. Klikk for å sortere stigende.`
              : `Ikke sortert. Klikk for å sortere synkende.`
        }
        variant="ghost"
        size="sm"
        className="-ml-3 flex h-8 gap-2 data-[state=open]:bg-accent"
        onClick={(e) => {
          e.preventDefault();
          console.log("column.id", column.id);
          void setSortBy(columnOrderResult === "desc" ? null : column.id);
          void setOrder(
            columnOrderResult === "asc"
              ? "desc"
              : columnOrderResult === "desc"
                ? null
                : "asc",
          );
        }}
      >
        <span>{title}</span>
        {columnOrderResult === "asc" && (
          <ArrowUp size={16} className="text-icon" aria-hidden="true" />
        )}
        {columnOrderResult === "desc" && (
          <ArrowDown size={16} className="text-icon" aria-hidden="true" />
        )}
        {!columnOrderResult && (
          <ChevronsUpDown size={16} className="text-icon" aria-hidden="true" />
        )}
      </Button>
    </div>
  );
}
