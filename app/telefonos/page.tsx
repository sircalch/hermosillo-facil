import Link from "next/link";

import { UsefulPhoneCard } from "@/components/UsefulPhoneCard";
import { getAllPhones } from "@/lib/content";

export default function PhonesPage() {
  const phones = getAllPhones();

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
        <header className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Telefonos
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Telefonos utiles de Hermosillo
          </h1>
          <p className="mt-3 text-slate-700">
            Directorio rapido para reportes ciudadanos y atencion prioritaria.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {phones.map((phone) => (
            <UsefulPhoneCard key={phone.id} phone={phone} />
          ))}
        </section>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
