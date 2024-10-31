"use client";

import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useCallback } from "react";
import { MultiBox, type MultiBoxProps } from "~/components/multi-box";

export type MultiBoxFilterProps = Pick<MultiBoxProps, "label" | "options"> & {
  id: string;
};

export function MultiBoxFilter({ id, label, options }: MultiBoxFilterProps) {
  const [selectedOptions, setSelectedOptions] = useQueryState(
    id,
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
    <MultiBox
      label={label}
      options={options}
      selectedOptions={selectedOptions}
      setSelectedOption={setSelectedOption}
      clearSelectedOptions={() => setSelectedOptions(null)}
    />
  );
}
