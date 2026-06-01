import Link from "next/link";

import { GuideCategory } from "@/types/guide";

type CategoryCardProps = {
  category: GuideCategory;
  guideCount: number;
};

export function CategoryCard({ category, guideCount }: CategoryCardProps) {
  return (
    <article className="rounded-md border border-slate-200 bg-white">
      <div className="flex flex-wrap items-start justify-between gap-3 px-5 py-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{category.name}</h3>
          <p className="mt-1 text-sm text-slate-600">{category.description}</p>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {guideCount} guias
        </p>
      </div>
      <div className="border-t border-slate-200 px-5 py-3">
        <Link
          href={`/categoria/${category.slug}`}
          className="inline-flex min-h-9 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Abrir categoria
        </Link>
      </div>
    </article>
  );
}
