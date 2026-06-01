import { NextRequest } from "next/server";

import rawGuides from "@/data/guides.json";
import { GuideEntry } from "@/types/guide";

const fallbackGuides = rawGuides as GuideEntry[];

type GuidesSource = "supabase" | "seed";

type GuidesQuery = {
  q: string;
  category: string;
  sourceType: "all" | GuideEntry["sourceType"];
  limit: number | null;
};

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function asStringArray(value: unknown): string[] | null {
  if (!Array.isArray(value)) {
    return null;
  }
  const normalized = value.filter((item): item is string => typeof item === "string");
  return normalized.length === value.length ? normalized : null;
}

function isSourceType(value: unknown): value is GuideEntry["sourceType"] {
  return (
    value === "oficial" ||
    value === "abierto" ||
    value === "ciudadano" ||
    value === "verificado"
  );
}

function isVerificationStatus(value: unknown): value is GuideEntry["verificationStatus"] {
  return value === "vigente" || value === "pendiente" || value === "en-revision";
}

function pick(
  record: Record<string, unknown>,
  candidates: string[],
): unknown {
  for (const key of candidates) {
    if (key in record) {
      return record[key];
    }
  }
  return undefined;
}

function normalizeGuide(record: unknown): GuideEntry | null {
  if (!record || typeof record !== "object") {
    return null;
  }

  const source = record as Record<string, unknown>;

  const slug = asString(pick(source, ["slug", "id"]));
  const title = asString(pick(source, ["title", "name"]));
  const category = asString(pick(source, ["category", "category_slug"]));
  const summary = asString(pick(source, ["summary", "description"]));
  const requirements =
    asStringArray(pick(source, ["requirements", "requisitos"])) ?? [];
  const steps = asStringArray(pick(source, ["steps", "pasos"])) ?? [];
  const officialLink =
    asString(pick(source, ["officialLink", "official_link", "url"])) ?? "";
  const phone = asString(pick(source, ["phone", "telefono"])) ?? "N/D";
  const location = asString(pick(source, ["location", "ubicacion"])) ?? "N/D";
  const updatedAt =
    asString(pick(source, ["updatedAt", "updated_at"])) ??
    new Date().toISOString();
  const sourceTypeRaw = pick(source, ["sourceType", "source_type"]);
  const sourceType = isSourceType(sourceTypeRaw) ? sourceTypeRaw : "abierto";
  const sourceName =
    asString(pick(source, ["sourceName", "source_name"])) ?? "Sin fuente";
  const verificationStatusRaw = pick(source, [
    "verificationStatus",
    "verification_status",
  ]);
  const verificationStatus = isVerificationStatus(verificationStatusRaw)
    ? verificationStatusRaw
    : "pendiente";

  if (!slug || !title || !category || !summary) {
    return null;
  }

  return {
    slug,
    title,
    category,
    summary,
    requirements,
    steps,
    officialLink,
    phone,
    location,
    updatedAt,
    sourceType,
    sourceName,
    verificationStatus,
  };
}

async function loadGuidesFromSupabase(): Promise<GuideEntry[] | null> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_GUIDES_TABLE ?? "guides";

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  try {
    const endpoint = new URL(`/rest/v1/${table}`, supabaseUrl);
    endpoint.searchParams.set("select", "*");

    const response = await fetch(endpoint.toString(), {
      method: "GET",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as unknown;
    if (!Array.isArray(payload)) {
      return null;
    }

    const normalized = payload
      .map((item) => normalizeGuide(item))
      .filter((item): item is GuideEntry => item !== null);

    return normalized.length > 0 ? normalized : null;
  } catch {
    return null;
  }
}

function parseLimit(value: string | null): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return null;
  }
  return Math.min(Math.floor(parsed), 500);
}

function parseQuery(request: NextRequest): GuidesQuery {
  const params = request.nextUrl.searchParams;
  const sourceType = params.get("source") ?? "all";

  return {
    q: (params.get("q") ?? "").trim().toLowerCase(),
    category: (params.get("category") ?? "all").trim().toLowerCase(),
    sourceType:
      sourceType === "oficial" ||
      sourceType === "abierto" ||
      sourceType === "ciudadano" ||
      sourceType === "verificado"
        ? sourceType
        : "all",
    limit: parseLimit(params.get("limit")),
  };
}

function filterGuides(guides: GuideEntry[], query: GuidesQuery): GuideEntry[] {
  const words = query.q.length > 0 ? query.q.split(/\s+/).filter(Boolean) : [];

  let filtered = guides.filter((guide) => {
    if (query.category !== "all" && guide.category.toLowerCase() !== query.category) {
      return false;
    }
    if (query.sourceType !== "all" && guide.sourceType !== query.sourceType) {
      return false;
    }
    if (words.length === 0) {
      return true;
    }

    const searchable = [
      guide.title,
      guide.summary,
      guide.location,
      guide.sourceName,
      guide.requirements.join(" "),
      guide.steps.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return words.every((word) => searchable.includes(word));
  });

  filtered = filtered.sort((a, b) => {
    const updatedDiff =
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    if (Number.isFinite(updatedDiff) && updatedDiff !== 0) {
      return updatedDiff;
    }
    return a.title.localeCompare(b.title, "es");
  });

  if (query.limit) {
    return filtered.slice(0, query.limit);
  }

  return filtered;
}

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const query = parseQuery(request);

  const supabaseGuides = await loadGuidesFromSupabase();
  const source: GuidesSource = supabaseGuides ? "supabase" : "seed";
  const guides = supabaseGuides ?? fallbackGuides;
  const filteredGuides = filterGuides(guides, query);

  return Response.json({
    source,
    count: filteredGuides.length,
    total: guides.length,
    guides: filteredGuides,
    generatedAt: new Date().toISOString(),
  });
}
