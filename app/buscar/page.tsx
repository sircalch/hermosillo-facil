import Link from "next/link";

import { SearchGuidesClient } from "@/components/SearchGuidesClient";
import { getAllGuides } from "@/lib/content";

type SearchPageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

function pickFirst(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const initialQuery = pickFirst(params.q);
  const initialCategory = pickFirst(params.categoria) || "all";
  const initialSourceType = pickFirst(params.fuente) || "all";
  const guides = getAllGuides();

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Buscar</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Buscador de guias</h1>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Consulta tramites por tema, tipo de fuente y palabras clave en una sola vista.
          </p>
        </header>

        <SearchGuidesClient
          guides={guides}
          initialQuery={initialQuery}
          initialCategory={initialCategory}
          initialSourceType={initialSourceType}
        />

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
