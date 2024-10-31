"use client";

import type { Row, Table as TableType } from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { cn } from "~/lib/utils";

type DataTableBaseProps<TData> = {
  table: TableType<TData>;
  columnLength: number;
  colorOddRows?: boolean;
  tableHeadRowClassName?: string;
  tableBodyRowClassName?: string | ((row: Row<TData>) => string);
  tableBodyCellClassName?: string;
  tableHeadCellClassName?: string;
} & (
  | {
      rowNavigationBy?: undefined;
      tableBodyRowOnClick?: (
        e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
        row: Row<TData>,
      ) => void;
    }
  | {
      rowNavigationBy?: keyof TData;
      tableBodyRowOnClick?: undefined;
    }
);

export function DataTableBase<TData>({
  table,
  columnLength,
  rowNavigationBy = undefined,
  colorOddRows = false,
  tableHeadRowClassName,
  tableBodyRowClassName,
  tableBodyCellClassName,
  tableHeadCellClassName,
  tableBodyRowOnClick,
}: DataTableBaseProps<TData>) {
  const pathName = usePathname();
  const router = useRouter();
  return (
    <div className="border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className={cn(tableHeadRowClassName)}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn("", tableHeadCellClassName)}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  "animate-fade-in transition-colors duration-300 hover:bg-pink-50",
                  { "odd:bg-orange-50": colorOddRows },
                  {
                    "hover:cursor-pointer":
                      rowNavigationBy ?? tableBodyRowOnClick,
                  },
                  typeof tableBodyRowClassName === "function"
                    ? tableBodyRowClassName(row)
                    : tableBodyRowClassName,
                )}
                onClick={(e) => {
                  if (rowNavigationBy) {
                    router.push(
                      `${pathName}/${row.original[rowNavigationBy] as string}`,
                    );
                  }
                  if (tableBodyRowOnClick) {
                    tableBodyRowOnClick(e, row);
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn("p-3", tableBodyCellClassName)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnLength} className="h-24 text-center">
                Ingen resultat.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
