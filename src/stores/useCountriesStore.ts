import { defineStore } from "pinia";

import type {
    CountryRaw,
    CountryView,
    CountryOptionItem,
    CountriesMeta,
} from "@/types/country.types";
import type { ContinentId } from "@/types";

import { useTravelStatsStore } from "@/stores/useTravelStatsStore";
import { CONTINENT_LABELS } from "@/constants/appConstants";

import countries from "@/data/build/countries.data.json";
import meta from "@/data/meta/countries.meta.json";

type CountryLocale = "en" | "ru";

interface CountriesState {
    search: string;
    locale: CountryLocale;
    selectedIso2: string | null;
}

export const useCountriesStore = defineStore("countriesStore", {
    state: (): CountriesState => ({
        search: "",
        locale: "en",
        selectedIso2: null,
    }),

    getters: {
        currentLocale(state): CountryLocale {
            return state.locale === "ru" ? "ru" : "en";
        },

        allCountries(): CountryRaw[] {
            return countries as CountryRaw[];
        },

        // ALL
        totalCountriesCount(): number {
            return (countries as CountryRaw[]).filter(
                (country) => country.status === "UN" || country.status === "OBS",
            ).length;
        },

        // 195
        totalCountriesAllCount(): number {
            return (countries as CountryRaw[]).length;
        },

        // ALL Continents
        allContinentIds(): ContinentId[] {
            return Object.keys(CONTINENT_LABELS) as ContinentId[];
        },

        totalContinentsCount(): number {
            return this.allContinentIds.length;
        },

        meta(): CountriesMeta {
            return meta as CountriesMeta;
        },

        generatedAtDisplay(): string {
            return this.meta.generatedAt.display;
        },

        filteredCountries(state): CountryOptionItem[] {
            const query = state.search.trim().toLowerCase();

            const source = !query
                ? countries
                : countries.filter((country) => {
                      return (
                          country.name.ru.toLowerCase().includes(query) ||
                          country.name.en.toLowerCase().includes(query) ||
                          country.iso2.toLowerCase().includes(query)
                      );
                  });

            return source.map((country) => ({
                iso2: country.iso2,
                label: country.name[this.currentLocale],
            }));
        },

        selectedCountry(state): CountryRaw | null {
            if (!state.selectedIso2) return null;

            return (countries as CountryRaw[]).find((c) => c.iso2 === state.selectedIso2) ?? null;
        },

        selectedCountryView(): CountryView | null {
            const c = this.selectedCountry;
            if (!c) return null;

            const travelStatsStore = useTravelStatsStore();

            return {
                iso2: c.iso2,

                name: c.name[this.currentLocale] ?? c.name.en,
                capital: c.capital[this.currentLocale] ?? c.capital.en,

                population: c.population,
                status: c.status,
                visited: travelStatsStore.isVisited(c.iso2),
                continents: c.continentIds.map((id) => CONTINENT_LABELS[id][this.currentLocale]),

                currencies: c.currencies.map(
                    (currency) => currency.name[this.currentLocale] ?? currency.name.en,
                ),

                languages: c.languages.map(
                    (language) => language.name[this.currentLocale] ?? language.name.en,
                ),
            };
        },

        continentsLabel(): string {
            return this.selectedCountryView?.continents.join(", ") ?? "—";
        },

        currenciesLabel(): string {
            return this.selectedCountryView?.currencies.join(", ") ?? "—";
        },

        languagesLabel(): string {
            return this.selectedCountryView?.languages.join(", ") ?? "—";
        },
    },

    actions: {
        setSearch(value: string) {
            this.search = value;
        },

        resetSearch() {
            this.search = "";
        },

        setLocale(locale: CountryLocale) {
            this.locale = locale;
        },

        selectCountry(iso2: string) {
            this.selectedIso2 = iso2;
        },
    },
});
