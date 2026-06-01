import { CalendarClock, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { SourceBadge } from "@/components/SourceBadge";
import { GuideEntry } from "@/types/guide";

type GuideCardProps = {
  guide: GuideEntry;
};

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-6 text-slate-900">{guide.title}</h3>
        <p className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
          <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
          {guide.updatedAt}
        </p>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-700">{guide.summary}</p>
      <div className="mt-3 grid gap-1 sm:grid-cols-2">
        <p className="inline-flex items-center gap-1 text-xs text-slate-600">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          {guide.location}
        </p>
        <p className="inline-flex items-center gap-1 text-xs text-slate-600">
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          {guide.phone}
        </p>
      </div>
      <p className="mt-2 text-xs text-slate-600">Fuente: {guide.sourceName}</p>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
        <SourceBadge guide={guide} />
        <Link
          href={`/guia/${guide.slug}`}
          className="inline-flex min-h-9 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50"
        >
          Ver guia
        </Link>
      </div>
    </article>
  );
}
