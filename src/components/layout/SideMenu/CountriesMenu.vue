<template>
    <div v-if="countriesStore.selectedCountryView" class="flex w-full flex-1 flex-col gap-3">
        <p>Континент: {{ countriesStore.continentsLabel ?? "—" }}</p>
        <p>Столица: {{ countriesStore.selectedCountryView.capital }}</p>
        <p>Язык: {{ countriesStore.languagesLabel }}</p>
        <p>Население: {{ countriesStore.selectedCountryView.population.toLocaleString() }}</p>
        <p>Валюта: {{ countriesStore.currenciesLabel }}</p>
        <Button
            :variant="countriesStore.selectedCountryView.visited ? 'outline' : 'blue'"
            shape="pill"
            padding-variant="large"
            :label="
                countriesStore.selectedCountryView.visited
                    ? 'sideMenu.remove_country_title'
                    : 'sideMenu.add_country_title'
            "
            @click="travelStatsStore.toggleSelectedCountry()"
        />
    </div>
</template>

<script setup lang="ts">
import { useCountriesStore } from "@/stores/useCountriesStore";
import { useTravelStatsStore } from "@/stores/useTravelStatsStore";

import Button from "@/components/ui/atoms/Button.vue";

const countriesStore = useCountriesStore();
const travelStatsStore = useTravelStatsStore();
</script>

<style lang="scss"></style>
