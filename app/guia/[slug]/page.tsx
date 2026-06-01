import Link from "next/link";
import { notFound } from "next/navigation";

import { GuideDetail } from "@/components/GuideDetail";
import { getAllGuides, getGuideBySlug } from "@/lib/content";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <GuideDetail guide={guide} />

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href={`/categoria/${guide.category}`}
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            Ver categoria
          </Link>
          <Link
            href="/buscar"
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            Buscar otra guia
          </Link>
        </div>
      </main>
    </div>
  );
}
