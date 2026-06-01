import { UsefulPhone } from "@/types/guide";

type UsefulPhoneCardProps = {
  phone: UsefulPhone;
};

export function UsefulPhoneCard({ phone }: UsefulPhoneCardProps) {
  const dial = phone.number.replaceAll(" ", "");

  return (
    <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-900">{phone.name}</h3>
        <a
          href={`tel:${dial}`}
          className="inline-flex min-h-8 items-center justify-center rounded-md border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
        >
          Llamar
        </a>
      </div>
      <p className="mt-2 text-xl font-semibold text-slate-900">{phone.number}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{phone.description}</p>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        Horario: {phone.schedule}
      </p>
    </article>
  );
}
