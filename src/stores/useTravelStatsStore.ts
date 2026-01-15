import { defineStore } from "pinia";

import type { CountryStatus } from "@/types/country.types";
import type { ContinentId } from "@/types";
import { useCountriesStore } from "@/stores/useCountriesStore";

const VISITED_COUNTRIES_KEY = "visited_countries";

interface TravelStatsState {
    visitedIso2: string[];
}

export const useTravelStatsStore = defineStore("travelStatsStore", {
    state: (): TravelStatsState => ({
        visitedIso2: [],
    }),

    getters: {
        visitedIso2Set(state): Set<string> {
            return new Set(state.visitedIso2);
        },

        visitedCount(state): number {
            return state.visitedIso2.length;
        },

        isVisited(): (iso2: string) => boolean {
            return (iso2: string) => this.visitedIso2Set.has(iso2);
        },

        totalCountriesStatCount(): number {
            const countriesStore = useCountriesStore();
            return countriesStore.totalCountriesCount;
        },

        visitedFromStatTotal(): string {
            return `${this.visitedCount}/${this.totalCountriesStatCount}`;
        },

        totalCountriesAllCount(): number {
            const countriesStore = useCountriesStore();
            return countriesStore.totalCountriesAllCount;
        },

        visitedAllPercent(): number {
            if (this.totalCountriesAllCount === 0) return 0;
            return (this.visitedCount / this.totalCountriesAllCount) * 100;
        },

        visitedAllPercentRounded(): string {
            return `${Math.round(this.visitedAllPercent)}%`;
        },

        totalContinentsCount(): number {
            const countriesStore = useCountriesStore();
            return countriesStore.totalContinentsCount;
        },

        visitedContinents(): Set<ContinentId> {
            const countriesStore = useCountriesStore();
            const visited = new Set<ContinentId>();

            for (const iso2 of this.visitedIso2) {
                const country = countriesStore.countryByIso2[iso2];
                if (!country) continue;

                country.continentIds.forEach((id) => visited.add(id));
            }

            return visited;
        },

        visitedContinentsCount(): number {
            return this.visitedContinents.size;
        },

        visitedContinentsFromTotal(): string {
            return `${this.visitedContinentsCount}/${this.totalContinentsCount}`;
        },

        visitedCountriesList(): {
            iso2: string;
            name: string;
            status: CountryStatus;
        }[] {
            const countriesStore = useCountriesStore();

            return [...this.visitedIso2]
                .reverse()
                .map((iso2) => {
                    const country = countriesStore.countryByIso2[iso2];
                    if (!country || country.status === undefined) return null;

                    return {
                        iso2: country.iso2,
                        name: country.name[countriesStore.currentLocale] ?? country.name.en,
                        status: country.status,
                    };
                })
                .filter(Boolean) as {
                iso2: string;
                name: string;
                status: CountryStatus;
            }[];
        },
    },

    actions: {
        init() {
            const raw = localStorage.getItem(VISITED_COUNTRIES_KEY);
            if (!raw) return;

            try {
                const parsed = JSON.parse(raw);
                this.visitedIso2 = Array.isArray(parsed) ? parsed : [];
            } catch {
                this.visitedIso2 = [];
            }
        },

        syncToStorage() {
            localStorage.setItem(VISITED_COUNTRIES_KEY, JSON.stringify(this.visitedIso2));
        },

        addVisitedCountry(iso2: string) {
            if (!iso2) return;
            if (this.visitedIso2.includes(iso2)) return;

            this.visitedIso2.push(iso2);
            this.syncToStorage();
        },

        removeVisitedCountry(iso2: string) {
            if (!iso2) return;

            const index = this.visitedIso2.indexOf(iso2);
            if (index === -1) return;

            this.visitedIso2.splice(index, 1);
            this.syncToStorage();
        },

        toggleSelectedCountry() {
            const countriesStore = useCountriesStore();
            const iso2 = countriesStore.selectedIso2;
            if (!iso2) return;

            if (this.visitedIso2.includes(iso2)) {
                this.removeVisitedCountry(iso2);
            } else {
                this.addVisitedCountry(iso2);
            }
        },
    },
});
