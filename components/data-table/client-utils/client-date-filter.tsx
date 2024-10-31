"use client";

import type { Column } from "@tanstack/react-table";
import type { DateRange } from "react-day-picker";
import { useState } from "react";
import { format } from "date-fns";
import { DateRangePicker } from "~/components/date-range-picker";

type DataTableClientDateFilterProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
};

export function DataTableClientDateFilter<TData, TValue>({
  title,
  column,
}: DataTableClientDateFilterProps<TData, TValue>) {
  const defaultFrom = (
    column.getFilterValue() as [string, string] | undefined
  )?.[0];
  const defaultTo = (
    column.getFilterValue() as [string, string] | undefined
  )?.[1];
  const [range, setRange] = useState<DateRange | undefined>({
    from: defaultFrom ? new Date(defaultFrom) : undefined,
    to: defaultTo ? new Date(defaultTo) : undefined,
  });
  const handleSelectDate = (selectedDateRange?: DateRange) => {
    setRange(selectedDateRange);

    const filterValues = [
      selectedDateRange?.from
        ? format(selectedDateRange.from, "LLL dd, y")
        : undefined,
      selectedDateRange?.to
        ? format(selectedDateRange.to, "LLL dd, y")
        : undefined,
    ];

    column.setFilterValue(filterValues.length ? filterValues : undefined);
  };

  return (
    <DateRangePicker
      title={title}
      range={range}
      handleSelectDate={handleSelectDate}
    />
  );
}
