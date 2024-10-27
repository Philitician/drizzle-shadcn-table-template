"server-only";

const AUTHORS = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Michael Scott" },
  { id: 3, name: "Dwight Schrute" },
  { id: 4, name: "Pam Beesly" },
  { id: 5, name: "Jim Halpert" },
];

export const getAuthors = async () => {
  // delay 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return AUTHORS;
};

export type Author = Awaited<ReturnType<typeof getAuthors>>[number];
