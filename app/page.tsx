import { ExternalLink, FileCheck2, Phone, Search } from "lucide-react";
import Link from "next/link";

import { CategoryCard } from "@/components/CategoryCard";
import { GuideCard } from "@/components/GuideCard";
import {
  getAllCategories,
  getAllGuides,
  getGuidesByCategory,
} from "@/lib/content";

export default function Home() {
  const categories = getAllCategories().slice(0, 4);
  const allGuides = getAllGuides();
  const featuredGuides = allGuides.slice(0, 6);
  const officialCount = allGuides.filter((guide) => guide.sourceType === "oficial").length;
  const verifiedCount = allGuides.filter(
    (guide) => guide.verificationStatus === "vigente",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 md:px-6 md:py-10">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Servicio local
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">
                Hermosillo Facil
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Directorio operativo de tramites, apoyos y servicios para consulta
                rapida. Enfoque en fuente, vigencia y accion inmediata.
              </p>
            </div>
            <div className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 sm:w-auto">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Estado del catalogo
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {allGuides.length} guias / {getAllCategories().length} categorias
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <article className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Fuentes oficiales
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{officialCount}</p>
            </article>
            <article className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Guias vigentes
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{verifiedCount}</p>
            </article>
            <article className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Total publicadas
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{allGuides.length}</p>
            </article>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/buscar"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Abrir buscador
            </Link>
            <Link
              href="/telefonos"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Telefonos utiles
            </Link>
          </div>

          <section className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Fuentes recomendadas
            </h2>
            <ul className="mt-3 grid gap-2 md:grid-cols-2">
              <li>
                <a
                  href="https://www.hermosillo.gob.mx/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 underline"
                >
                  Gobierno de Hermosillo
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://datos.sonora.gob.mx/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 underline"
                >
                  Datos Abiertos Sonora
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.inegi.org.mx/servicios/api_denue.html"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 underline"
                >
                  API DENUE (INEGI)
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.inegi.org.mx/servicios/api_indicadores.html"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 underline"
                >
                  API Indicadores (INEGI)
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </section>
        </section>

        <section>
          <div className="mb-3 flex items-end justify-between gap-3">
            <h2 className="text-2xl font-semibold text-slate-900">
              Categorias destacadas
            </h2>
            <Link href="/buscar" className="text-sm font-semibold text-slate-700 underline">
              Ver todo
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                guideCount={getGuidesByCategory(category.slug).length}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-semibold text-slate-900">Guias recientes</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>

        <section className="rounded-md border border-slate-200 bg-white shadow-sm">
          <header className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Criterio de confianza
            </h2>
          </header>
          <div className="grid gap-3 px-5 py-4 md:grid-cols-2">
            <article className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-900">Fuente oficial</p>
              <p className="mt-1 text-sm text-slate-700">
                Datos directos de portales de gobierno o dependencias formales.
              </p>
            </article>
            <article className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-900">Dato abierto</p>
              <p className="mt-1 text-sm text-slate-700">
                Informacion de conjuntos abiertos, sujeta a fecha de actualizacion.
              </p>
            </article>
            <article className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-900">Reporte ciudadano</p>
              <p className="mt-1 text-sm text-slate-700">
                Entrada comunitaria sin validacion final de dependencia.
              </p>
            </article>
            <article className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                <FileCheck2 className="h-4 w-4 text-slate-500" aria-hidden="true" />
                Verificado
              </p>
              <p className="mt-1 text-sm text-slate-700">
                Dato revisado manualmente por el equipo del proyecto.
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
