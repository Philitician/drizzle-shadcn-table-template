"use client";

import type { Column } from "@tanstack/react-table";
import { MultiBox } from "~/components/multi-box";

type DataTableClientFilterProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
};

export function DataTableClientFilter<TData, TValue>({
  column,
  title,
}: DataTableClientFilterProps<TData, TValue>) {
  if (!column) return null;
  const rowModel = column.getFacetedRowModel();

  const options = Array.from(
    new Set(
      rowModel.rows.flatMap((row) => {
        const value = row.original[column.id as keyof TData];
        return (typeof value === "string" ? [value] : value) as string[];
      }),
    ),
  )
    .filter((value) => value.trim() !== "") // remove empty strings
    .map((value) => ({ label: value, value }));

  const selectedValues = Array.from(
    new Set(column.getFilterValue() as string[]),
  );

  const setSelectedOption = (option: string) => {
    const isSelected = selectedValues.includes(option);
    if (isSelected) {
      column.setFilterValue(selectedValues.filter((value) => value !== option));
    } else {
      column.setFilterValue([...selectedValues, option]);
    }
  };

  return (
    <MultiBox
      label={title ?? ""}
      options={options}
      selectedOptions={selectedValues}
      setSelectedOption={setSelectedOption}
      clearSelectedOptions={() => column.setFilterValue(undefined)}
    />
  );
}
