import { db } from ".";
import { authors, posts } from "./schemas";
import { faker } from "@faker-js/faker";
import type { NewPost } from "./schemas/posts/types";

const AUTHORS = [
  { name: "Michael Scott" },
  { name: "Dwight Schrute" },
  { name: "Jim Halpert" },
  { name: "Pam Beesly" },
  { name: "Ryan Howard" },
];

const createAuthors = async () => {
  return db.insert(authors).values(AUTHORS);
};

const createPosts = async () => {
  const allAuthors = await db.select().from(authors);
  await db.insert(posts).values(
    allAuthors.map(
      ({ id }) =>
        ({
          authorId: id,
          title: faker.book.title(),
        }) satisfies NewPost,
    ),
  );
};

const main = async () => {
  // await createAuthors();
  await createPosts();
};

main()
  .catch(console.error)
  .finally(() => process.exit(0));
