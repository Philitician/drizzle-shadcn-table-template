"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { newPostSchema, type NewPost } from "~/db/schemas/posts/types";
import { createPost } from "./_actions";

type CreatePostFormProviderProps = {
  closeModal: () => void;
  children: React.ReactNode;
};

export function CreatePostFormProvider({
  closeModal,
  children,
}: CreatePostFormProviderProps) {
  const form = useForm<NewPost>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      authorId: 0,
      status: "Draft",
    },
  });
  const onSubmit = form.handleSubmit((data) => {
    try {
      void createPost(data);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {children}
      </form>
    </FormProvider>
  );
}
