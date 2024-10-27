"use client";

import { useFormContext } from "react-hook-form";
import { FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import type { NewPost } from "~/db/schemas/posts/types";

export function TitleInput() {
  const form = useFormContext<NewPost>();
  return (
    <FormField
      control={form.control}
      name="title"
      render={({ field }) => <Input {...field} placeholder="Title" />}
    />
  );
}
