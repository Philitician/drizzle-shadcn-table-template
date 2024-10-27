import { PostsDataTable } from "./components/posts-data-table";
import { getPostRows } from "./queries";
import type { SearchParams } from "nuqs/server";
import { postsSearchParamsCache } from "./search-params";
import { PostsDataTableToolbar } from "./components/posts-data-table/toolbar";

type PostsPageProps = {
  searchParams: SearchParams;
};

export default function PostsPage({ searchParams }: PostsPageProps) {
  postsSearchParamsCache.parse(searchParams);
  return (
    <div className="space-y-4 px-12 pb-12">
      <div>
        <h1 className="py-8 text-3xl font-semibold">Manage posts</h1>
        <div className="absolute left-0 w-full border-b border-border" />
      </div>
      <div className="flex flex-col gap-1">
        <PostsDataTableToolbar />
        <PostsDataTable dataPromise={getPostRows()} />
      </div>
    </div>
  );
}
