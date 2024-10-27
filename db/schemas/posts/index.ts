// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  index,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { POST_STATUSES } from "./constants";

export const postStatusEnum = pgEnum("post_status", POST_STATUSES);

export const posts = pgTable(
  "posts",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity({ startWith: 1 }),
    title: varchar("title", { length: 255 }).notNull(),
    status: postStatusEnum("post_status").notNull().default("Draft"),
    authorId: integer("author_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
    publishedAt: timestamp("published_at", { withTimezone: true }),
  },
  (post) => ({
    titleIndex: index("title_idx").on(post.title),
    authorIndex: index("author_idx").on(post.authorId),
  }),
);
