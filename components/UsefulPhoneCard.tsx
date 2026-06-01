import { UsefulPhone } from "@/types/guide";

type UsefulPhoneCardProps = {
  phone: UsefulPhone;
};

export function UsefulPhoneCard({ phone }: UsefulPhoneCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-semibold text-slate-900">{phone.name}</h3>
      <p className="mt-1 text-xl font-semibold text-slate-900">{phone.number}</p>
      <p className="mt-3 text-sm text-slate-600">{phone.description}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Horario: {phone.schedule}
      </p>
    </article>
  );
}
