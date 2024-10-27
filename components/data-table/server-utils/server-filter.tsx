"use client";

import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useCallback } from "react";
import { FancyFilter, type FancyFilterProps } from "~/components/fancy-filter";

export type ServerFilterProps = Pick<FancyFilterProps, "label" | "options"> & {
  filterKey: string;
};

export function ServerFilter({ filterKey, label, options }: ServerFilterProps) {
  const [selectedOptions, setSelectedOptions] = useQueryState(
    filterKey,
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({
      shallow: false,
    }),
  );

  const setSelectedOption = useCallback(
    (option: string) => {
      const newSelectedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((o) => o !== option)
        : [...selectedOptions, option];
      void setSelectedOptions(
        newSelectedOptions.length > 0 ? newSelectedOptions : null,
      );
    },
    [selectedOptions, setSelectedOptions],
  );

  return (
    <FancyFilter
      label={label}
      options={options}
      selectedOptions={selectedOptions}
      setSelectedOption={setSelectedOption}
      clearSelectedOptions={() => setSelectedOptions(null)}
    />
  );
}
