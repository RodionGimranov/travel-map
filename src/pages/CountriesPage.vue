<template>
    <section class="flex w-200 max-w-200 flex-col items-start justify-start">
        <div class="mb-7.5! flex w-full items-start justify-between">
            <div class="flex flex-col items-start justify-start gap-0.5">
                <p class="text-primary-dark text-[20px] leading-6 font-medium">
                    {{ $t("stats.visited_countries_title") }}
                </p>
                <p class="text-primary-gray text-[14px] font-normal">
                    Учитываются все страны и территории
                </p>
            </div>
            <p class="text-primary-gray text-[16px] font-normal">
                {{ travelStatsStore.visitedFromStatTotal }}
            </p>
        </div>
        <div class="flex w-full flex-col items-start justify-start gap-1.5">
            <VisitedCountryItem
                v-for="country in countries"
                :key="country.iso2"
                :iso2="country.iso2"
                :name="country.name"
                :status="country.status"
                @select="onSelectCountry"
                @remove="travelStatsStore.removeVisitedCountry"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { CountryStatus } from "@/types";
import { useCountriesStore } from "@/stores/useCountriesStore";
import { useTravelStatsStore } from "@/stores/useTravelStatsStore";
import { useSideMenuStore } from "@/stores/useSideMenuStore";

import VisitedCountryItem from "@/components/stats/VisitedCountryItem.vue";

interface VisitedCountry {
    id: string | number;
    name: string;
    status: CountryStatus;
}

defineProps<{
    countries: VisitedCountry[];
}>();

const countriesStore = useCountriesStore();
const travelStatsStore = useTravelStatsStore();
const sideMenuStore = useSideMenuStore();

const countries = computed(() => travelStatsStore.visitedCountriesList);

const onSelectCountry = (iso2: string) => {
    countriesStore.selectCountry(iso2);
    sideMenuStore.open("countries");
};
</script>

<style lang="scss"></style>
