"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { CreatePostFormProvider } from "./posts-form-provider";

type CreatePostDialogProps = {
  children: React.ReactNode;
};

export function CreatePostDialog({ children }: CreatePostDialogProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(isOpen) => setIsModalOpen(isOpen)}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2 text-sm">
          <Plus className="text-icon h-5 w-5" />
          Create post
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl leading-6">
            <Plus className="text-icon" />
            Create new post
          </DialogTitle>
          <DialogDescription>Create a new post</DialogDescription>
        </DialogHeader>
        <CreatePostFormProvider closeModal={() => setIsModalOpen(false)}>
          {children}
        </CreatePostFormProvider>
      </DialogContent>
    </Dialog>
  );
}
