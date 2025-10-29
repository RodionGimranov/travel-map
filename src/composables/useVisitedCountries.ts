import { useUserStatsStore } from "@/stores/userStats";
import { computed } from "vue";

export function useVisitedCountries() {
    const stats = useUserStatsStore();

    const isVisited = (iso2: string) => computed(() => stats.visitedCountries.includes(iso2));

    const toggleVisited = (iso2: string, visited: boolean) => {
        if (visited) {
            stats.addCountry(iso2);
        } else {
            stats.removeCountry(iso2);
        }
    };

    return { isVisited, toggleVisited };
}
