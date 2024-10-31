import { PostsDataTable } from "./components/posts-data-table";
import { getPostRows } from "./_queries";
import type { SearchParams } from "nuqs/server";
import { postsSearchParamsCache } from "./search-params";

import { CreatePostDialog } from "./components/create-post/create-post-dialog";
import { AuthorSelect } from "./components/create-post/fields/author-select";
import { TitleInput } from "./components/create-post/fields/title-input";
import { StatusSelect } from "./components/create-post/fields/status-select";
import { Button } from "~/components/ui/button";
import { getAuthors } from "./_queries";
import { Suspense } from "react";

type PostsPageProps = {
  searchParams: SearchParams;
};

export default async function PostsPage({ searchParams }: PostsPageProps) {
  postsSearchParamsCache.parse(searchParams);
  const authors = await getAuthors();
  return (
    <div className="space-y-4 px-12 pb-12">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="py-8 text-3xl font-semibold">Manage posts</h1>
          <CreatePostDialog>
            <Suspense>
              <AuthorSelect authors={authors} />
            </Suspense>
            <TitleInput />
            <StatusSelect />
            <Button type="submit">Create</Button>
          </CreatePostDialog>
        </div>
        <div className="absolute left-0 w-full border-b border-border" />
      </div>
      <PostsDataTable dataPromise={getPostRows()} authors={authors} />
    </div>
  );
}
