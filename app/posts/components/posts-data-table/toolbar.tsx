import type { ServerFilterProps } from "~/components/data-table/server-utils/server-filter";
import { ServerFilter } from "~/components/data-table/server-utils/server-filter";
import { DataTableServerSearch } from "~/components/data-table/server-utils/server-search";
import { POST_STATUSES } from "~/db/schemas/posts/constants";
import { CreatePostDialog } from "../create-post/create-post-dialog";
import { Button } from "~/components/ui/button";
import { AuthorSelect } from "../create-post/fields/author-select";
import { StatusSelect } from "../create-post/fields/status-select";
import { TitleInput } from "../create-post/fields/title-input";
import { getAuthors } from "../../_queries";

const CONSTANT_FILTERS: ServerFilterProps[] = [
  {
    filterKey: "status",
    label: "Status",
    options: POST_STATUSES.map((status) => ({
      value: status,
      label: status,
    })),
  },
];

export async function PostsDataTableToolbar() {
  const authors = await getAuthors();
  const filters = [
    ...CONSTANT_FILTERS,
    {
      filterKey: "authorId",
      label: "Author",
      options: authors.map((author) => ({
        value: author.id.toString(),
        label: author.name,
      })),
    },
  ];
  return (
    <div className="flex justify-between gap-8">
      <div className="flex items-center gap-2">
        <DataTableServerSearch placeholder="Search posts..." className="w-80" />
        <div className="flex gap-2">
          {filters.map((filter) => (
            <ServerFilter key={filter.filterKey} {...filter} />
          ))}
        </div>
      </div>
      <CreatePostDialog>
        <AuthorSelect authors={authors} />
        <TitleInput />
        <StatusSelect />
        <Button type="submit">Create</Button>
      </CreatePostDialog>
    </div>
  );
}
