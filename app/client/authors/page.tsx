import { AuthorsDataTable } from "./authors-data-table";
import { getAuthors } from "./_queries";

export default function AuthorsPage() {
  return (
    <div className="space-y-4 px-12 pb-12">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="py-8 text-3xl font-semibold">
            Manage authors (client-side)
          </h1>
        </div>
      </div>
      <AuthorsDataTable dataPromise={getAuthors()} />
    </div>
  );
}
