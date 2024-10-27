"use client";

import { useFormContext } from "react-hook-form";
import { FormField } from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { POST_STATUSES } from "~/db/schemas/posts/constants";
import type { NewPost } from "~/db/schemas/posts/types";

export function StatusSelect() {
  const form = useFormContext<NewPost>();
  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            {POST_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
