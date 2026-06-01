import type { Metadata } from "next";
import {
  CircleHelp,
  Database,
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
      <body className="min-h-full flex flex-col bg-slate-50">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-slate-900 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
        >
          Saltar al contenido
        </a>
        <header className="border-b border-slate-300 bg-white">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-2 md:px-6">
            <p className="text-xs font-medium text-slate-600">
              Directorio local de tramites y servicios con criterios de calidad de fuente.
            </p>
            <a
              href="https://www.hermosillo.gob.mx/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-9 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Portal Hermosillo
              <SquareArrowOutUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Servicio local
              </p>
              <Link href="/" className="text-xl font-semibold text-slate-900">
                Hermosillo Facil
              </Link>
            </div>
            <nav className="flex flex-wrap items-center gap-2 text-sm">
              <Link
                href="/buscar"
                className="inline-flex min-h-10 items-center gap-2 rounded-md px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Buscar
              </Link>
              <Link
                href="/telefonos"
                className="inline-flex min-h-10 items-center gap-2 rounded-md px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Telefonos
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-10 items-center gap-2 rounded-md px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
              >
                <CircleHelp className="h-4 w-4" aria-hidden="true" />
                Acerca
              </Link>
              <Link
                href="/admin/guias"
                className="inline-flex min-h-10 items-center gap-2 rounded-md px-3 py-2 font-medium text-slate-700 hover:bg-slate-100"
              >
                <Database className="h-4 w-4" aria-hidden="true" />
                Admin
              </Link>
            </nav>
          </div>
        </header>
        <div id="contenido" className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
