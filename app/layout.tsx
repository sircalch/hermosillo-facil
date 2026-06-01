import type { Metadata } from "next";
import {
  Phone,
  Search,
  SquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hermosillo Facil",
  description:
    "Guias rapidas de tramites, apoyos y telefonos utiles para Hermosillo.",
};

const DONATION_URL = process.env.NEXT_PUBLIC_DONATION_URL ?? "";
const SHOW_INTERNAL_NAV = process.env.NEXT_PUBLIC_SHOW_INTERNAL_NAV === "true";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-slate-900 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
        >
          Saltar al contenido
        </a>
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur">
          <div className="bg-emerald-50/80">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-b border-emerald-100 px-4 py-2 md:px-6">
              <p className="text-xs font-medium text-slate-700">
                Directorio local de tramites y servicios con criterios de calidad de fuente.
              </p>
              <a
                href="https://www.hermosillo.gob.mx/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-9 items-center gap-2 rounded-md bg-emerald-700 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-600"
              >
                Portal Hermosillo
                <SquareArrowOutUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Servicio local
              </p>
              <Link href="/" className="text-xl font-semibold text-slate-900">
                Hermosillo Facil
              </Link>
            </div>
            <nav className="flex flex-wrap items-center gap-2 text-sm">
              <Link
                href="/buscar"
                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent px-3 py-2 font-medium text-slate-700 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Buscar
              </Link>
              <Link
                href="/telefonos"
                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent px-3 py-2 font-medium text-slate-700 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Telefonos
              </Link>
              {SHOW_INTERNAL_NAV ? (
                <>
                  <Link
                    href="/about"
                    className="inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent px-3 py-2 font-medium text-slate-700 hover:border-emerald-200 hover:bg-emerald-50"
                  >
                    Acerca
                  </Link>
                  <Link
                    href="/admin/guias"
                    className="inline-flex min-h-10 items-center gap-2 rounded-md border border-transparent px-3 py-2 font-medium text-slate-700 hover:border-emerald-200 hover:bg-emerald-50"
                  >
                    Admin
                  </Link>
                </>
              ) : null}
            </nav>
          </div>
        </header>
        <div id="contenido" className="flex-1">
          {children}
        </div>
        <footer className="border-t border-slate-200/80 bg-white/90">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Creado por
              </p>
              <p className="text-sm font-semibold text-slate-900">
                Ing. Andres Monreal
              </p>
              <p className="text-xs text-slate-600">
                Ingeniero Biomedico / Topic Tales Biomedica
              </p>
            </div>
            {DONATION_URL ? (
              <div className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Apoya el proyecto
                </p>
                <a
                  href={DONATION_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex min-h-8 items-center justify-center rounded-md bg-emerald-700 px-3 py-1 text-xs font-medium text-white transition hover:bg-emerald-600"
                >
                  Donar con PayPal
                </a>
              </div>
            ) : null}
          </div>
        </footer>
      </body>
    </html>
  );
}
