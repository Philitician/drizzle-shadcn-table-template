"use client";

import { useFormContext } from "react-hook-form";
import type { Author } from "~/app/posts/_queries";
import { FormField } from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { NewPost } from "~/db/schemas/posts/types";

type AuthorSelectProps = {
  authors: Author[];
};

export function AuthorSelect({ authors }: AuthorSelectProps) {
  const form = useFormContext<NewPost>();
  return (
    <FormField
      control={form.control}
      name="authorId"
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Select an author" />
          </SelectTrigger>
          <SelectContent>
            {authors.map((author) => (
              <SelectItem key={author.id} value={author.id.toString()}>
                {author.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}
