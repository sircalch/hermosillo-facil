import Link from "next/link";
import { notFound } from "next/navigation";

import { GuideCard } from "@/components/GuideCard";
import {
  getAllCategories,
  getCategoryBySlug,
  getGuidesByCategory,
} from "@/lib/content";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const guides = getGuidesByCategory(slug);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Categoria
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            {category.name}
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-700">{category.description}</p>
        </header>

        {guides.length > 0 ? (
          <section className="grid gap-3 md:grid-cols-2">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </section>
        ) : (
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-700">
              Esta categoria aun no tiene guias publicadas.
            </p>
          </section>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/buscar"
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            Ir a buscador
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            Inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
