"use client";

import { useDebouncedCallback } from "use-debounce";
import { useQueryState } from "nuqs";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Search, X } from "lucide-react";
import { useRef } from "react";

type DataTableServerSearchProps = {
  placeholder?: string;
  className?: string;
};

export function DataTableServerSearch({
  placeholder,
  className,
}: DataTableServerSearchProps) {
  const [query, setQuery] = useQueryState("query", {
    defaultValue: "",
    shallow: false,
  });
  const debounced = useDebouncedCallback((value: string) => {
    void setQuery(value);
  }, 200);

  const inputRef = useRef<HTMLInputElement>(null);

  const setFocusToInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div
        className="absolute inset-y-0 left-3 flex items-center"
        onClick={setFocusToInput}
      >
        <Search size={20} className="text-muted-foreground" />
      </div>
      <Input
        ref={inputRef}
        placeholder={placeholder ?? "Søk..."}
        defaultValue={query}
        onChange={(e) => debounced(e.target.value)}
        className={cn("pl-10", className)}
      />
      {Boolean(query) && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <Button
            size="icon"
            variant="ghost"
            type="button"
            aria-label="Clear"
            className="h-7 w-7 text-gray-600"
            onClick={() => setQuery(null)}
          >
            <X size={18} className="text-muted-foreground" />
          </Button>
        </div>
      )}
    </div>
  );
}
