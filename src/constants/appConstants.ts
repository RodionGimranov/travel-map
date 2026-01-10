import type { ContinentId } from "@/types";

export const REST_COUNTRIES_BASE_URL = "https://restcountries.com/";

export const CONTINENT_LABELS: Record<ContinentId, { ru: string; en: string }> = {
    EU: { ru: "Европа", en: "Europe" },
    AS: { ru: "Азия", en: "Asia" },
    AF: { ru: "Африка", en: "Africa" },
    NA: { ru: "Северная Америка", en: "North America" },
    SA: { ru: "Южная Америка", en: "South America" },
    OC: { ru: "Океания", en: "Oceania" },
    AN: { ru: "Антарктида", en: "Antarctica" },
};
