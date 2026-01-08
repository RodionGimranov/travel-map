import { defineStore } from "pinia";

import type { ContinentId } from "@/types";
import { useCountriesStore } from "@/stores/useCountriesStore";

const VISITED_COUNTRIES_KEY = "visited_countries";

interface TravelStatsState {
    visitedIso2: Set<string>;
}

export const useTravelStatsStore = defineStore("travelStatsStore", {
    state: (): TravelStatsState => ({
        visitedIso2: new Set<string>(),
    }),

    getters: {
        visitedCount(state): number {
            return state.visitedIso2.size;
        },

        isVisited: (state) => {
            return (iso2: string): boolean => {
                return state.visitedIso2.has(iso2);
            };
        },

        /* ===== X / 195 (UN + OBS) ===== */
        totalCountriesStatCount(): number {
            const countriesStore = useCountriesStore();
            return countriesStore.totalCountriesCount;
        },

        visitedFromStatTotal(): string {
            return `${this.visitedCount}/${this.totalCountriesStatCount}`;
        },

        /* ===== % / (UN + OBS + DISP) ===== */
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

        // X / 7
        totalContinentsCount(): number {
            const countriesStore = useCountriesStore();
            return countriesStore.totalContinentsCount;
        },

        visitedContinents(): Set<ContinentId> {
            const countriesStore = useCountriesStore();
            const visited = new Set<ContinentId>();

            for (const country of countriesStore.allCountries) {
                if (!this.visitedIso2.has(country.iso2)) continue;

                country.continentIds.forEach((id) => {
                    visited.add(id);
                });
            }

            return visited;
        },

        visitedContinentsCount(): number {
            return this.visitedContinents.size;
        },

        visitedContinentsFromTotal(): string {
            return `${this.visitedContinentsCount}/${this.totalContinentsCount}`;
        },
    },

    actions: {
        init() {
            const raw = localStorage.getItem(VISITED_COUNTRIES_KEY);
            if (!raw) return;

            try {
                this.visitedIso2 = new Set(JSON.parse(raw));
            } catch {
                this.visitedIso2.clear();
            }
        },

        syncToStorage() {
            localStorage.setItem(VISITED_COUNTRIES_KEY, JSON.stringify([...this.visitedIso2]));
        },

        toggleSelectedCountry() {
            const countriesStore = useCountriesStore();
            const iso2 = countriesStore.selectedIso2;

            if (!iso2) return;

            if (this.visitedIso2.has(iso2)) {
                this.visitedIso2.delete(iso2);
            } else {
                this.visitedIso2.add(iso2);
            }

            this.syncToStorage();
        },
    },
});
