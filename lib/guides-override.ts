import { GuideEntry } from "@/types/guide";

export const GUIDES_OVERRIDE_STORAGE_KEY = "hmo_guides_override_v1";
export const GUIDES_OVERRIDE_EVENT = "hmo-guides-override-updated";

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isGuideEntry(value: unknown): value is GuideEntry {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.slug === "string" &&
    typeof record.title === "string" &&
    typeof record.category === "string" &&
    typeof record.summary === "string" &&
    isStringArray(record.requirements) &&
    isStringArray(record.steps) &&
    typeof record.officialLink === "string" &&
    typeof record.phone === "string" &&
    typeof record.location === "string" &&
    typeof record.updatedAt === "string" &&
    (record.sourceType === "oficial" ||
      record.sourceType === "abierto" ||
      record.sourceType === "ciudadano" ||
      record.sourceType === "verificado") &&
    typeof record.sourceName === "string" &&
    (record.verificationStatus === "vigente" ||
      record.verificationStatus === "pendiente" ||
      record.verificationStatus === "en-revision")
  );
}

function parseGuides(value: unknown): GuideEntry[] {
  if (!Array.isArray(value)) {
    throw new Error("El JSON debe ser un arreglo de guias.");
  }

  if (!value.every((item) => isGuideEntry(item))) {
    throw new Error("El JSON contiene guias con estructura invalida.");
  }

  return value;
}

export function parseGuidesInput(rawText: string): GuideEntry[] {
  const parsed = JSON.parse(rawText) as unknown;
  return parseGuides(parsed);
}

export function readGuidesOverride(): GuideEntry[] | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(GUIDES_OVERRIDE_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return parseGuides(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function writeGuidesOverride(guides: GuideEntry[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    GUIDES_OVERRIDE_STORAGE_KEY,
    JSON.stringify(guides),
  );
  window.dispatchEvent(new CustomEvent(GUIDES_OVERRIDE_EVENT));
}

export function clearGuidesOverride(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(GUIDES_OVERRIDE_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(GUIDES_OVERRIDE_EVENT));
}

export function subscribeGuidesOverride(onChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== GUIDES_OVERRIDE_STORAGE_KEY) {
      return;
    }
    onChange();
  };

  const handleCustom = () => {
    onChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(GUIDES_OVERRIDE_EVENT, handleCustom);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(GUIDES_OVERRIDE_EVENT, handleCustom);
  };
}
