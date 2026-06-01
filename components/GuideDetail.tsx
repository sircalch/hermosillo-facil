import { ShareButton } from "@/components/ShareButton";
import { SourceBadge } from "@/components/SourceBadge";
import { GuideEntry } from "@/types/guide";

type GuideDetailProps = {
  guide: GuideEntry;
};

export function GuideDetail({ guide }: GuideDetailProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 lg:grid-cols-[1.55fr_0.45fr]">
        <div>
          <h1 className="text-3xl font-semibold leading-tight text-slate-900">
            {guide.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <SourceBadge guide={guide} />
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Fuente: {guide.sourceName}
            </p>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-700">{guide.summary}</p>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-slate-900">Requisitos</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {guide.requirements.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold text-slate-900">Pasos sugeridos</h2>
            <ol className="mt-3 space-y-2 text-sm text-slate-700">
              {guide.steps.map((item, index) => (
                <li
                  key={item}
                  className="rounded-md border border-slate-200 bg-white px-3 py-2"
                >
                  <span className="mr-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-100 px-1 text-xs font-semibold text-emerald-700">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-3">
          <article className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Enlace oficial
            </p>
            <a
              className="mt-2 inline-block break-all font-medium text-slate-900 underline"
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
            <p className="mt-2 font-medium text-slate-900">{guide.phone}</p>
            <p className="mt-1">{guide.location}</p>
          </article>
          <article className="rounded-md border border-slate-200 bg-white p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Compartir
            </p>
            <div className="mt-2">
              <ShareButton title={guide.title} text={guide.summary} />
            </div>
          </article>
        </aside>
      </div>
    </article>
  );
}
