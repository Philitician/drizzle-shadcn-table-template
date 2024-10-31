import type { DataTableServerFilterProps } from "./server-filter";
import type { DataTableServerDateFilterProps } from "./server-date-filter";
import type { DotNestedKeys } from "../types";

export type ServerFilterableColumn<TData> = {
  id: DotNestedKeys<TData>;
} & (
  | ({
      type: "select";
    } & DataTableServerFilterProps)
  | ({
      type: "date";
    } & DataTableServerDateFilterProps)
);
