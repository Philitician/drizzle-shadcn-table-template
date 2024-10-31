import { parseAsIsoDate, useQueryStates } from "nuqs";
import { DateRangePicker } from "~/components/date-range-picker";

export type DataTableServerDateFilterProps = {
  id: string;
  label: string;
};

export function DataTableServerDateFilter({
  id,
  label,
}: DataTableServerDateFilterProps) {
  const [{ startDate, endDate }, setRange] = useQueryStates(
    {
      startDate: parseAsIsoDate,
      endDate: parseAsIsoDate,
    },
    {
      shallow: false,
      urlKeys: {
        startDate: `${id}StartDate`,
        endDate: `${id}EndDate`,
      },
    },
  );

  return (
    <DateRangePicker
      timeZone="Europe/Oslo"
      title={label}
      range={
        startDate && endDate
          ? {
              from: startDate,
              to: endDate,
            }
          : undefined
      }
      handleSelectDate={(range) => {
        void setRange(
          range
            ? {
                startDate: range.from,
                endDate: range.to,
              }
            : null,
        );
      }}
    />
  );
}
