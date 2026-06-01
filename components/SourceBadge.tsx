import { GuideEntry } from "@/types/guide";

type SourceBadgeProps = {
  guide: GuideEntry;
};

export function SourceBadge({ guide }: SourceBadgeProps) {
  const sourceClass =
    guide.sourceType === "oficial"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : guide.sourceType === "abierto"
        ? "border-sky-200 bg-sky-50 text-sky-700"
        : guide.sourceType === "verificado"
          ? "border-violet-200 bg-violet-50 text-violet-700"
          : "border-amber-200 bg-amber-50 text-amber-700";

  const statusClass =
    guide.verificationStatus === "vigente"
      ? "border-slate-200 bg-slate-100 text-slate-700"
      : guide.verificationStatus === "en-revision"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-rose-200 bg-rose-50 text-rose-700";

  const sourceLabel =
    guide.sourceType === "oficial"
      ? "Fuente oficial"
      : guide.sourceType === "abierto"
        ? "Dato abierto"
        : guide.sourceType === "verificado"
          ? "Verificado"
          : "Reporte ciudadano";

  const statusLabel =
    guide.verificationStatus === "vigente"
      ? "Vigente"
      : guide.verificationStatus === "en-revision"
        ? "En revision"
        : "Pendiente";

  return (
    <div className="flex flex-wrap gap-2">
      <span
        className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold uppercase tracking-wide ${sourceClass}`}
      >
        {sourceLabel}
      </span>
      <span
        className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass}`}
      >
        {statusLabel}
      </span>
    </div>
  );
}
