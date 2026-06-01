import Link from "next/link";

import { GuideCategory } from "@/types/guide";

type CategoryCardProps = {
  category: GuideCategory;
  guideCount: number;
};

export function CategoryCard({ category, guideCount }: CategoryCardProps) {
  return (
    <article className="rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 px-4 py-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{category.name}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{category.description}</p>
        </div>
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
          {guideCount} guias
        </p>
      </div>
      <div className="border-t border-slate-200 px-4 py-3">
        <Link
          href={`/categoria/${category.slug}`}
          className="inline-flex min-h-9 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
        >
          Abrir categoria
        </Link>
      </div>
    </article>
  );
}
