"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo } from "react";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export type Option = {
  value: string;
  label: string;
};

export type FancyFilterProps = {
  label: string;
  options: Option[];
  selectedOptions: string[];
  setSelectedOption: (value: string) => void;
  clearSelectedOptions: () => void;
};

export function FancyFilter({
  label,
  options,
  selectedOptions,
  setSelectedOption,
  clearSelectedOptions,
}: FancyFilterProps) {
  const selectedOptionsCount = selectedOptions?.length ?? 0;

  const optionsSortedBySelected = useMemo(
    () =>
      options.sort((optionA, optionB) => {
        const isSelectedA = selectedOptions.includes(optionA.value);
        const isSelectedB = selectedOptions.includes(optionB.value);
        if (isSelectedA === isSelectedB) return 0;
        return isSelectedA ? -1 : 1;
      }),
    [options, selectedOptions],
  );
  return (
    <div className="max-w-[350px]">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            size="sm"
            className="w-[160px] justify-between bg-white text-sm font-medium text-slate-600"
          >
            <span className="truncate">
              {label} {selectedOptionsCount > 0 && `(${selectedOptionsCount})`}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("pb-4", {
            "pb-2": selectedOptionsCount > 0,
          })}
        >
          <Command loop>
            <CommandList>
              <CommandInput placeholder="Søk..." />
              <CommandGroup className="max-h-[145px] overflow-auto">
                {optionsSortedBySelected.map(({ value, label }) => {
                  console.log("value", value);
                  console.log("label", label);
                  return (
                    <CommandItem
                      key={value}
                      defaultValue={value}
                      onSelect={() => setSelectedOption(value)}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4 opacity-0", {
                          "opacity-100": selectedOptions.includes(value),
                        })}
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="truncate">
                            {label.length > 15
                              ? `${label.substring(0, 15)}...`
                              : label}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{label}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedOptionsCount > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={clearSelectedOptions}
                      className="cursor-pointer justify-center text-center"
                    >
                      Fjern filtre
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
