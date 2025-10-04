import { ref, computed } from "vue";
import type { ComputedRef } from "vue";

import type { LocalizedCountry } from "@/composables/useLocalizedCountry";

export function useSearch(countries: LocalizedCountry[] | ComputedRef<LocalizedCountry[]>) {
    const query = ref("");

    const filteredCountries = computed(() => {
        const arr = Array.isArray(countries) ? countries : countries.value;

        if (!query.value) return arr;

        const q = query.value.toLowerCase();

        return arr.filter((c) => {
            return (
                c.name.toLowerCase().includes(q) ||
                c.iso2.toLowerCase().includes(q) ||
                c.iso3.toLowerCase().includes(q)
            );
        });
    });

    return { query, filteredCountries };
}
