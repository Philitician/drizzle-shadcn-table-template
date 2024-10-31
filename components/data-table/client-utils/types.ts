import type { DataTableFilterType } from "../types";

export type ClientFilterableColumn<TData> = {
  id: keyof TData;
  type: DataTableFilterType;
};
