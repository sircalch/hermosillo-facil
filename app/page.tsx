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
  const featuredGuides = getAllGuides().slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 md:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            HMO Util
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 md:text-4xl">
            Hermosillo Facil
          </h1>
          <p className="mt-4 max-w-3xl text-slate-700">
            Encuentra tramites, apoyos, telefonos utiles y guias rapidas en un
            solo lugar.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/buscar"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Buscar guia
            </Link>
            <Link
              href="/telefonos"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Telefonos utiles
            </Link>
          </div>
          <section className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
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
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="text-2xl font-semibold text-slate-900">
              Categorias destacadas
            </h2>
            <Link
              href="/buscar"
              className="text-sm font-medium text-slate-700 underline"
            >
              Ver todo
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
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
          <h2 className="mb-4 text-2xl font-semibold text-slate-900">
            Guias recientes
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>

        <section className="rounded-md border border-slate-300 bg-white">
          <header className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Criterio de confianza
            </h2>
          </header>
          <div className="grid gap-4 px-6 py-4 md:grid-cols-2">
            <article>
              <p className="text-sm font-semibold text-slate-900">Fuente oficial</p>
              <p className="mt-1 text-sm text-slate-700">
                Datos directos de portales de gobierno o dependencias formales.
              </p>
            </article>
            <article>
              <p className="text-sm font-semibold text-slate-900">Dato abierto</p>
              <p className="mt-1 text-sm text-slate-700">
                Informacion de conjuntos abiertos, sujeta a fecha de actualizacion.
              </p>
            </article>
            <article>
              <p className="text-sm font-semibold text-slate-900">Reporte ciudadano</p>
              <p className="mt-1 text-sm text-slate-700">
                Entrada comunitaria sin validacion final de dependencia.
              </p>
            </article>
            <article>
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
