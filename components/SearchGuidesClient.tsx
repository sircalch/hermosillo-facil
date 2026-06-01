"use client";

import { CloudDownload, Filter, RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { GuideCard } from "@/components/GuideCard";
import { SearchBar } from "@/components/SearchBar";
import { getAllCategories } from "@/lib/content";
import {
  readGuidesOverride,
  subscribeGuidesOverride,
} from "@/lib/guides-override";
import { searchGuides } from "@/lib/search";
import { GuideEntry } from "@/types/guide";

type SearchGuidesClientProps = {
  guides: GuideEntry[];
  initialQuery?: string;
  initialCategory?: string;
  initialSourceType?: string;
};

type RemoteSource = "seed" | "supabase";

export function SearchGuidesClient({
  guides,
  initialQuery = "",
  initialCategory = "all",
  initialSourceType = "all",
}: SearchGuidesClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string>(initialCategory);
  const [sourceType, setSourceType] = useState<string>(initialSourceType);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery.trim());
  const [overrideGuides, setOverrideGuides] = useState<GuideEntry[] | null>(null);
  const [remoteGuides, setRemoteGuides] = useState<GuideEntry[]>(guides);
  const [remoteTotal, setRemoteTotal] = useState(guides.length);
  const [remoteSource, setRemoteSource] = useState<RemoteSource>("seed");
  const [isRemoteLoading, setIsRemoteLoading] = useState(false);
  const [remoteError, setRemoteError] = useState<string | null>(null);
  const categories = getAllCategories();

  useEffect(() => {
    const syncGuides = () => {
      const override = readGuidesOverride();
      setOverrideGuides(override ?? null);
    };

    syncGuides();
    return subscribeGuidesOverride(syncGuides);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 250);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) {
        return;
      }

      if (event.key.toLowerCase() !== "k") {
        return;
      }

      event.preventDefault();
      searchInputRef.current?.focus();
      searchInputRef.current?.select();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery) {
      params.set("q", debouncedQuery);
    }
    if (category !== "all") {
      params.set("categoria", category);
    }
    if (sourceType !== "all") {
      params.set("fuente", sourceType);
    }

    const target = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(target, { scroll: false });
  }, [debouncedQuery, category, sourceType, pathname, router]);

  const fetchRemoteGuides = useCallback(
    async (
      currentQuery: string,
      currentCategory: string,
      currentSourceType: string,
      signal?: AbortSignal,
    ) => {
      setIsRemoteLoading(true);
      setRemoteError(null);

      const params = new URLSearchParams();
      if (currentQuery) {
        params.set("q", currentQuery);
      }
      if (currentCategory !== "all") {
        params.set("category", currentCategory);
      }
      if (currentSourceType !== "all") {
        params.set("source", currentSourceType);
      }

      try {
        const response = await fetch(`/api/guides?${params.toString()}`, {
          cache: "no-store",
          signal,
        });

        if (!response.ok) {
          throw new Error("No fue posible cargar las guias remotas.");
        }

        const payload = (await response.json()) as {
          guides?: GuideEntry[];
          source?: RemoteSource;
          total?: number;
        };

        if (!Array.isArray(payload.guides)) {
          throw new Error("La respuesta remota no incluye guias validas.");
        }

        setRemoteGuides(payload.guides);
        setRemoteTotal(
          typeof payload.total === "number" ? payload.total : payload.guides.length,
        );
        setRemoteSource(payload.source === "supabase" ? "supabase" : "seed");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        const fallback = searchGuides(guides, currentQuery).filter((guide) => {
          if (currentCategory !== "all" && guide.category !== currentCategory) {
            return false;
          }
          if (currentSourceType !== "all" && guide.sourceType !== currentSourceType) {
            return false;
          }
          return true;
        });
        setRemoteError("No se pudo actualizar el dataset remoto.");
        setRemoteGuides(fallback);
        setRemoteTotal(guides.length);
        setRemoteSource("seed");
      } finally {
        setIsRemoteLoading(false);
      }
    },
    [guides],
  );

  useEffect(() => {
    if (overrideGuides) {
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      void fetchRemoteGuides(
        debouncedQuery,
        category,
        sourceType,
        controller.signal,
      );
    }, 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [debouncedQuery, category, sourceType, overrideGuides, fetchRemoteGuides]);

  const localFilteredGuides = useMemo(() => {
    const base = overrideGuides ?? guides;
    return searchGuides(base, query).filter((guide) => {
      if (category !== "all" && guide.category !== category) return false;
      if (sourceType !== "all" && guide.sourceType !== sourceType) return false;
      return true;
    });
  }, [overrideGuides, guides, query, category, sourceType]);

  const filteredGuides = overrideGuides ? localFilteredGuides : remoteGuides;

  const quickTerms = ["licencia", "predial", "beca", "agua", "alumbrado"];
  const categoryLabel =
    category === "all"
      ? "todas"
      : categories.find((item) => item.slug === category)?.name ?? category;
  const sourceLabelMap: Record<string, string> = {
    all: "todas",
    oficial: "oficial",
    abierto: "dato abierto",
    ciudadano: "ciudadano",
    verificado: "verificado",
  };
  const sourceLabel = sourceLabelMap[sourceType] ?? sourceType;
  const datasetLabel = overrideGuides ? "local (admin)" : remoteSource;

  return (
    <div className="grid gap-5 lg:grid-cols-[0.32fr_0.68fr]">
      <section className="h-fit rounded-lg border border-slate-200 bg-white p-5">
        <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filtros de busqueda
        </h2>
        <SearchBar value={query} onChange={setQuery} inputRef={searchInputRef} />
        <div className="mt-3 flex flex-wrap gap-2">
          {quickTerms.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setQuery(term)}
              className="inline-flex min-h-8 items-center justify-center rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
            >
              {term}
            </button>
          ))}
        </div>

        <label className="mt-4 block text-sm text-slate-700">
          Categoria
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="all">Todas</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-3 block text-sm text-slate-700">
          Fuente
          <select
            value={sourceType}
            onChange={(event) => setSourceType(event.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
          >
            <option value="all">Todas</option>
            <option value="oficial">Oficial</option>
            <option value="abierto">Dato abierto</option>
            <option value="ciudadano">Ciudadano</option>
            <option value="verificado">Verificado</option>
          </select>
        </label>
      </section>

      <div className="space-y-4">
        <section className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              <Search className="h-4 w-4" aria-hidden="true" />
              Resultados
            </h2>
            <p className="text-sm font-medium text-slate-700">
              {filteredGuides.length} guias
            </p>
          </div>
          <p className="mt-2 inline-flex items-center gap-2 text-xs text-slate-600">
            <Filter className="h-4 w-4" aria-hidden="true" />
            Categoria: {categoryLabel} / Fuente: {sourceLabel}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
              <CloudDownload className="h-4 w-4" aria-hidden="true" />
              Dataset: {datasetLabel}
            </p>
            {!overrideGuides ? (
              <button
                type="button"
                onClick={() => void fetchRemoteGuides(debouncedQuery, category, sourceType)}
                className="inline-flex min-h-8 items-center gap-2 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                Actualizar
              </button>
            ) : null}
          </div>
          {!overrideGuides ? (
            <p className="mt-1 text-xs text-slate-600">Base total: {remoteTotal} guias.</p>
          ) : null}
          {isRemoteLoading && !overrideGuides ? (
            <p className="mt-2 text-xs text-slate-500">Sincronizando resultados remotos...</p>
          ) : null}
          {remoteError && !overrideGuides ? (
            <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs text-amber-800">
              {remoteError}
            </p>
          ) : null}
        </section>

        <section className="space-y-3">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </section>

        {filteredGuides.length === 0 ? (
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-700">
              No se encontraron guias para esa busqueda.
            </p>
          </section>
        ) : null}
      </div>
    </div>
  );
}
