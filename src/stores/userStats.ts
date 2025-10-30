import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

import continentsJson from "@/data/continent.json";
import countriesJson from "@/data/countries.json";

interface Continent {
    id: string;
    name: { ru: string; en: string };
}

interface Country {
    id: number;
    name: { ru: string; en: string };
    iso2: string;
    iso3: string;
    continentId: string;
}

const LOCAL_KEY = "user_visited_countries";

export const useUserStatsStore = defineStore("userStats", () => {
    const continents = ref<Continent[]>(continentsJson);
    const countries = ref<Country[]>(countriesJson);

    const visitedCountries = ref<string[]>(loadVisitedCountries());

    function addCountry(iso2: string) {
        if (!visitedCountries.value.includes(iso2)) {
            visitedCountries.value.push(iso2);
        }
    }

    function removeCountry(iso2: string) {
        visitedCountries.value = visitedCountries.value.filter((c) => c !== iso2);
    }

    const totalVisited = computed(() => visitedCountries.value.length);

    const visitedContinents = computed(() => {
        const continentsSet = new Set<string>();
        visitedCountries.value.forEach((code) => {
            const country = countries.value.find((c) => c.iso2 === code);
            if (country) continentsSet.add(country.continentId);
        });
        return continentsSet.size;
    });

    const visitedPercentage = computed(() => {
        return (visitedCountries.value.length / countries.value.length) * 100;
    });

    watch(
        visitedCountries,
        (newVal) => {
            localStorage.setItem(LOCAL_KEY, JSON.stringify(newVal));
        },
        { deep: true },
    );

    function loadVisitedCountries(): string[] {
        try {
            const saved = localStorage.getItem(LOCAL_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.warn("Ошибка загрузки статистики из localStorage:", e);
            return [];
        }
    }

    return {
        continents,
        countries,
        visitedCountries,
        totalVisited,
        visitedContinents,
        visitedPercentage,

        addCountry,
        removeCountry,
    };
});
