import { computed } from "vue";
import { useI18n } from "vue-i18n";
import countries from "@/data/countries.json";

export interface LocalizedCountry {
    id: number;
    iso2: string;
    iso3: string;
    continentId: string;
    name: string;
}

export const getLocalizedCountries = (locale: "ru" | "en"): LocalizedCountry[] =>
    countries.map((country) => ({
        id: country.id,
        iso2: country.iso2,
        iso3: country.iso3,
        continentId: country.continentId,
        name: country.name[locale],
    }));

export const useLocalizedCountries = () => {
    const { locale } = useI18n();

    const localizedCountries = computed(() => {
        return getLocalizedCountries(locale.value as "ru" | "en");
    });

    return { localizedCountries };
};
