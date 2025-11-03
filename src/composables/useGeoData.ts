import { computed } from "vue";
import { useI18n } from "vue-i18n";

import countries from "@/data/countries.json";
import continent from "@/data/continent.json";

export interface LocalizedCountry {
    id: number;
    iso2: string;
    iso3: string;
    continentId: string;
    name: string;
}

export interface LocalizedContinent {
    id: string;
    name: string;
}

export const getLocalizedCountries = (locale: "ru" | "en"): LocalizedCountry[] =>
    countries.map((c) => ({
        id: c.id,
        iso2: c.iso2,
        iso3: c.iso3,
        continentId: c.continentId,
        name: c.name[locale],
    }));

export const useLocalizedCountries = () => {
    const { locale } = useI18n();
    const localizedCountries = computed(() => getLocalizedCountries(locale.value as "ru" | "en"));
    return { localizedCountries };
};

export const getLocalizedContinents = (locale: "ru" | "en"): LocalizedContinent[] =>
    continent.map((c) => ({
        id: c.id,
        name: c.name[locale],
    }));

export const useLocalizedContinents = () => {
    const { locale } = useI18n();
    const localizedContinents = computed(() => getLocalizedContinents(locale.value as "ru" | "en"));
    return { localizedContinents };
};
