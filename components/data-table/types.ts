const FILTER_TYPES = ["date", "select"] as const;
export type DataTableFilterType = (typeof FILTER_TYPES)[number];

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

export type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
          DotNestedKeys<T[K]>
        >}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;
