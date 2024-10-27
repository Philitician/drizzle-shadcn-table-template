export const POST_STATUSES = [
  "Draft",
  "Published",
  "Archived",
  "Under Review",
] as const;
export type PostStatus = (typeof POST_STATUSES)[number];
