import Fuse, { IFuseOptions } from "fuse.js";

import { GuideEntry } from "@/types/guide";

const fuseOptions: IFuseOptions<GuideEntry> = {
  includeScore: true,
  threshold: 0.35,
  keys: [
    { name: "title", weight: 0.5 },
    { name: "summary", weight: 0.3 },
    { name: "category", weight: 0.1 },
    { name: "requirements", weight: 0.1 },
  ],
};

export function searchGuides(guides: GuideEntry[], query: string): GuideEntry[] {
  const normalized = query.trim();
  if (!normalized) {
    return guides;
  }

  const fuse = new Fuse(guides, fuseOptions);
  return fuse.search(normalized).map((result) => result.item);
}
