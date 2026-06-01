import { ExternalLink, Search } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Acerca
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Hermosillo Facil
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Proyecto local para concentrar informacion practica sobre tramites,
            apoyos y servicios utiles en Hermosillo.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-slate-900">
            Alcance del MVP
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">Guias publicadas en JSON local.</li>
            <li className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">Buscador con Fuse.js.</li>
            <li className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">Paginas por categoria y ficha individual.</li>
            <li className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">Telefonos utiles y boton compartir.</li>
          </ul>

          <div className="mt-8">
            <Link
              href="/buscar"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Ir al buscador
            </Link>
          </div>

          <section className="mt-8 rounded-md border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Fuentes usadas en este MVP
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <a
                  href="https://www.hermosillo.gob.mx/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-slate-800 underline"
                >
                  Portal del Ayuntamiento de Hermosillo
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://datos.sonora.gob.mx/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-slate-800 underline"
                >
                  Portal de Datos Abiertos de Sonora
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://wiki.openstreetmap.org/wiki/Overpass_API"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-slate-800 underline"
                >
                  OpenStreetMap y Overpass API
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </section>
        </section>
      </main>
    </div>
  );
}
