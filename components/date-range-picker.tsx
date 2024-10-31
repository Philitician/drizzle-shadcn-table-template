"use client";

import type { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import type { CalendarProps } from "./ui/calendar";
import { Calendar } from "./ui/calendar";

import { cn } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type DateRangePickerProps = Omit<CalendarProps, "required"> & {
  title: string;
  range?: DateRange;
  handleSelectDate: (range?: DateRange) => void;
};

export function DateRangePicker({
  title,
  handleSelectDate,
  range,
  ...calendarProps
}: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          className="font-small w-full justify-start text-left text-sm font-medium text-slate-600 md:w-[15rem]"
        >
          <CalendarIcon className="text-icon-muted mr-2 h-4 w-4" />
          {range?.from ? (
            range.to ? (
              <span className="text-xs">
                {format(range.from, "LLL dd, y")} -{" "}
                {format(range.to, "LLL dd, y")}
              </span>
            ) : (
              format(range.from, "LLL dd, y")
            )
          ) : (
            <span className="truncate">Dato fra-til {title} </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="grid grid-cols-12">
          <Calendar
            {...calendarProps}
            className="col-span-12 lg:col-span-9"
            autoFocus
            mode="range"
            locale={nb}
            defaultMonth={range?.from}
            selected={range}
            onSelect={handleSelectDate}
            numberOfMonths={2}
            weekStartsOn={1}
          />
          <div className="col-span-12 lg:col-span-3 lg:py-3">
            <Presets range={range} setDateRange={handleSelectDate} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const PRESETS = [
  { name: "today", label: "I dag" },
  { name: "yesterday", label: "I går" },
  { name: "last7", label: "Siste 7 dager" },
  // { name: "last14", label: "Siste 14 dager" },
  { name: "last30", label: "Siste 30 dager" },
  { name: "thisWeek", label: "Denne uken" },
  { name: "lastWeek", label: "Forrige uke" },
  { name: "thisMonth", label: "Denne måneden" },
  // { name: "lastMonth", label: "Forrige måned" },
] as const;

type Preset = (typeof PRESETS)[number];
type PresetName = Preset["name"];

const getPresetRange = (presetName: PresetName) => {
  const preset = PRESETS.find(({ name }) => name === presetName);
  if (!preset) throw new Error(`Unknown date range preset: ${presetName}`);
  const from = new Date();
  const to = new Date();

  switch (preset.name) {
    case "today":
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);
      break;
    case "yesterday":
      from.setDate(from.getDate() - 1);
      from.setHours(0, 0, 0, 0);
      to.setDate(to.getDate() - 1);
      to.setHours(23, 59, 59, 999);
      break;
    case "last7":
      from.setDate(from.getDate() - 6);
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);
      break;
    // case "last14":
    //   from.setDate(from.getDate() - 13);
    //   from.setHours(0, 0, 0, 0);
    //   to.setHours(23, 59, 59, 999);
    //   break;
    case "last30":
      from.setDate(from.getDate() - 29);
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);
      break;
    case "thisWeek":
      thisWeek(from, to);
      break;
    case "lastWeek":
      lastWeek(from, to);
      break;
    case "thisMonth":
      from.setDate(1);
      from.setHours(0, 0, 0, 0);
      to.setMonth(from.getMonth() + 1);
      to.setDate(0); // This sets the date to the last day of the previous month, which is the last day of the current month
      to.setHours(23, 59, 59, 999);
      break;
    // case "lastMonth": // TODO: Fix last month
    //   from.setMonth(from.getMonth() - 1);
    //   from.setDate(1);
    //   from.setHours(0, 0, 0, 0);
    //   to.setDate(0);
    //   to.setHours(23, 59, 59, 999);
    //   break;
  }
  return { from, to };
};

const thisWeek = (from: Date, to: Date) => {
  const fromCopy = new Date(from);
  fromCopy.setDate(fromCopy.getDate() - ((fromCopy.getDay() + 6) % 7));
  fromCopy.setHours(0, 0, 0, 0);
  from.setTime(fromCopy.getTime());

  const toCopy = new Date(from);
  toCopy.setDate(fromCopy.getDate() + 6);
  toCopy.setHours(23, 59, 59, 999);
  to.setTime(toCopy.getTime());
};

const lastWeek = (from: Date, to: Date) => {
  const fromCopy = new Date(from);
  fromCopy.setDate(fromCopy.getDate() - (((fromCopy.getDay() + 6) % 7) + 7));
  fromCopy.setHours(0, 0, 0, 0);
  from.setTime(fromCopy.getTime());

  const toCopy = new Date(from);
  toCopy.setDate(fromCopy.getDate() + 6);
  toCopy.setHours(23, 59, 59, 999);
  to.setTime(toCopy.getTime());
};

type PresetsProps = {
  range: DateRange | undefined;
  setDateRange: (range: DateRange) => void;
};

function Presets({ range, setDateRange }: PresetsProps) {
  const [selectedPresetName, setSelectedPresetName] = useState<
    PresetName | undefined
  >();

  const checkPreset = () => {
    for (const preset of PRESETS) {
      if (!range?.from) return;
      const presetRange = getPresetRange(preset.name);

      const normalizedRangeFrom = new Date(range.from);
      normalizedRangeFrom.setHours(0, 0, 0, 0);
      const normalizedPresetFrom = new Date(
        presetRange.from.setHours(0, 0, 0, 0),
      );

      const normalizedRangeTo = new Date(range.to ?? 0);
      normalizedRangeTo.setHours(0, 0, 0, 0);
      const normalizedPresetTo = new Date(
        presetRange.to.setHours(0, 0, 0, 0) ?? 0,
      );

      if (
        normalizedRangeFrom.getTime() === normalizedPresetFrom.getTime() &&
        normalizedRangeTo.getTime() === normalizedPresetTo.getTime()
      ) {
        setSelectedPresetName(preset.name);
        return;
      }
    }

    setSelectedPresetName(undefined);
  };

  const setPresetName = (presetName: PresetName) => {
    setDateRange(getPresetRange(presetName));
  };

  useEffect(() => {
    checkPreset();
  }, [range]);

  return (
    <>
      <div className="hidden flex-col gap-1 lg:flex">
        {PRESETS.map((preset) => (
          <PresetButton
            key={preset.name}
            label={preset.label}
            isSelected={selectedPresetName === preset.name}
            setPreset={() => setPresetName(preset.name)}
          />
        ))}
      </div>
      <div className="block lg:hidden">
        <Select
          defaultValue={selectedPresetName}
          onValueChange={(value) => {
            setPresetName(value as PresetName);
          }}
        >
          <SelectTrigger className="mx-auto mb-2 w-[200px]">
            <SelectValue placeholder="Velg..." />
          </SelectTrigger>
          <SelectContent>
            {PRESETS.map((preset) => (
              <SelectItem key={preset.name} value={preset.name}>
                {preset.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
type PresetButtonProps = {
  label: string;
  isSelected: boolean;

  setPreset: () => void;
};

function PresetButton({ label, isSelected, setPreset }: PresetButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("flex justify-end gap-2", {
        "pointer-events-none": isSelected,
      })}
      onClick={setPreset}
    >
      <Check
        size={16}
        className={cn("text-icon opacity-0", {
          "opacity-90": isSelected,
        })}
      />

      {label}
    </Button>
  );
}
