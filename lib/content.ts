import rawCategories from "@/data/categories.json";
import rawGuides from "@/data/guides.json";
import rawPhones from "@/data/phones.json";
import { GuideCategory, GuideEntry, UsefulPhone } from "@/types/guide";

const categories = rawCategories as GuideCategory[];
const guides = rawGuides as GuideEntry[];
const phones = rawPhones as UsefulPhone[];

export function getAllCategories(): GuideCategory[] {
  return categories;
}

export function getCategoryBySlug(slug: string): GuideCategory | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getAllGuides(): GuideEntry[] {
  return guides;
}

export function getGuideBySlug(slug: string): GuideEntry | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuidesByCategory(categorySlug: string): GuideEntry[] {
  return guides.filter((guide) => guide.category === categorySlug);
}

export function getAllPhones(): UsefulPhone[] {
  return phones;
}
