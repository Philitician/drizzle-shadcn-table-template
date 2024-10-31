"use server";

import { revalidatePath } from "next/cache";
import { db } from "~/db";
import { posts } from "~/db/schemas";
import type { NewPost } from "~/db/schemas/posts/types";

export const createPost = async (newPost: NewPost) => {
  console.log("newPost", newPost);
  await db.insert(posts).values(newPost);
  revalidatePath("/posts");
};
