<template>
    <section class="countries_stat_page_wrapper common_page_wrapper">
        <div class="stat_page_header" v-if="visitedCountriesList.length > 0">
            <p class="stat_page_title">{{ $t("message.country_stat_title") }}</p>
            <p class="countries_progress_count">{{ totalVisited }}/{{ totalCountries }}</p>
        </div>
        <div class="total_stat_country_list">
            <CountryListItem
                v-for="country in visitedCountriesList"
                :key="country.id"
                :country="country"
                :checked="isVisited(country.iso2).value"
                @change="(checked) => toggleVisited(country.iso2, checked)"
                listItemStyle="_fill"
            />
        </div>
        <div v-if="visitedCountriesList.length === 0" class="empty_stat_container">
            <p class="empty_stat_title">{{ $t("message.empty_country_stat_title") }}</p>
            <p class="empty_stat_subtitle">{{ $t("message.empty_country_stat_subtitle") }}</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useUserStatsStore } from "@/stores/userStats";
import { useVisitedCountries } from "@/composables/useVisitedCountries";
import { useLocalizedCountries } from "@/composables/useLocalizedCountry";

import CountryListItem from "@/components/ui/CountryListItem/CountryListItem.vue";

const userStats = useUserStatsStore();
const { isVisited, toggleVisited } = useVisitedCountries();
const { localizedCountries } = useLocalizedCountries();

const totalVisited = computed(() => userStats.totalVisited);
const totalCountries = computed(() => userStats.countries.length);

const visitedCountriesList = computed(() =>
    localizedCountries.value.filter((country) => isVisited(country.iso2).value),
);
</script>

<style lang="scss">
.countries_progress_count {
    font-size: 16px;
    font-weight: 400;
    color: $third_gray;
}

.total_stat_country_list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 6px;
}

.empty_stat_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
}

.empty_stat_title {
    font-size: 24px;
    font-weight: 500;
    color: $primary_dark;
}

.empty_stat_subtitle {
    font-size: 16px;
    font-weight: 400;
    color: $third_gray;
}
</style>
