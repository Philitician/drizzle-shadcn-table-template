import { AuthorsDataTable } from "./authors-data-table";
import { getAuthors } from "./_queries";
import { authorsSearchParamsCache } from "./search-params";
import type { SearchParams } from "nuqs/server";

type AuthorsPageProps = {
  searchParams: SearchParams;
};

export default function AuthorsPage({ searchParams }: AuthorsPageProps) {
  authorsSearchParamsCache.parse(searchParams);
  return (
    <div className="space-y-4 px-12 pb-12">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="py-8 text-3xl font-semibold">
            Manage authors (server-side)
          </h1>
        </div>
      </div>
      <AuthorsDataTable dataPromise={getAuthors()} />
    </div>
  );
}
