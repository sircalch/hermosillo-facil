import { ExternalLink, Search } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-5xl px-4 py-10 md:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Acerca
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Hermosillo Facil
          </h1>
          <p className="mt-4 text-slate-700">
            Proyecto local para concentrar informacion practica sobre tramites,
            apoyos y servicios utiles en Hermosillo.
          </p>

          <h2 className="mt-6 text-xl font-semibold text-slate-900">
            Alcance del MVP
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Guias publicadas en JSON local.</li>
            <li>Buscador con Fuse.js.</li>
            <li>Paginas por categoria y ficha individual.</li>
            <li>Telefonos utiles y boton compartir.</li>
          </ul>

          <div className="mt-8">
            <Link
              href="/buscar"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
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
