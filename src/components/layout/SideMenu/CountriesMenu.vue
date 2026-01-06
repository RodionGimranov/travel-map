<template>
    <div v-if="countriesStore.selectedCountryView" class="flex w-full flex-1 flex-col gap-3">
        <p>Континент: {{ countriesStore.continentsLabel ?? "—" }}</p>
        <p>Столица: {{ countriesStore.selectedCountryView.capital }}</p>
        <p>Язык: {{ countriesStore.languagesLabel }}</p>
        <p>Население: {{ countriesStore.selectedCountryView.population.toLocaleString() }}</p>
        <p>Валюта: {{ countriesStore.currenciesLabel }}</p>
    </div>
</template>

<script setup lang="ts">
import { useCountriesStore } from "@/stores/useCountriesStore";

const countriesStore = useCountriesStore();
</script>

<style lang="scss"></style>
