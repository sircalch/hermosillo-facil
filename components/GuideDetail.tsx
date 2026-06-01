import { ShareButton } from "@/components/ShareButton";
import { SourceBadge } from "@/components/SourceBadge";
import { GuideEntry } from "@/types/guide";

type GuideDetailProps = {
  guide: GuideEntry;
};

export function GuideDetail({ guide }: GuideDetailProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6">
      <h1 className="text-3xl font-semibold text-slate-900">{guide.title}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <SourceBadge guide={guide} />
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Fuente: {guide.sourceName}
        </p>
      </div>
      <p className="mt-3 text-slate-700">{guide.summary}</p>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-slate-900">Requisitos</h2>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          {guide.requirements.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-slate-900">Pasos sugeridos</h2>
        <ol className="mt-2 space-y-2 text-sm text-slate-700">
          {guide.steps.map((item, index) => (
            <li key={item}>
              <span className="font-semibold text-slate-900">{index + 1}.</span>{" "}
              {item}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        <article className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Enlace oficial
          </p>
          <a
            className="mt-1 inline-block font-medium text-slate-900 underline"
            href={guide.officialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {guide.officialLink}
          </a>
        </article>
        <article className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Contacto
          </p>
          <p className="mt-1 font-medium text-slate-900">{guide.phone}</p>
          <p className="mt-1">{guide.location}</p>
        </article>
      </section>

      <div className="mt-6">
        <ShareButton title={guide.title} text={guide.summary} />
      </div>
    </article>
  );
}
