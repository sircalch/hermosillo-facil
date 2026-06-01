import Link from "next/link";

import { UsefulPhoneCard } from "@/components/UsefulPhoneCard";
import { getAllPhones } from "@/lib/content";

export default function PhonesPage() {
  const phones = getAllPhones();

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Telefonos
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Telefonos utiles de Hermosillo
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Directorio rapido para reportes ciudadanos y atencion prioritaria.
          </p>
        </header>

        <section className="grid gap-3 md:grid-cols-2">
          {phones.map((phone) => (
            <UsefulPhoneCard key={phone.id} phone={phone} />
          ))}
        </section>

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
