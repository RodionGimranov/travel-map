<template>
    <section class="home_page_wrapper common_page_wrapper">
        <MapWrapper />
        <div class="home_card_stats_container">
            <TotalStatCard
                v-for="(stat, index) in total_stat"
                :key="index"
                :title="stat.title"
                :icon="stat.icon"
                :data="stat.data"
                :router-to="stat.router_to"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useUserStatsStore } from "@/stores/userStats";

import MapWrapper from "@/components/homeComponents/MapWrapper.vue";
import TotalStatCard from "@/components/ui/cards/TotalStatCard.vue";

const userStats = useUserStatsStore();

const total_stat = computed(() => [
    {
        title: "message.countries_title",
        icon: "countries-icon",
        data: userStats.totalVisited,
        router_to: "/countries",
    },
    {
        title: "message.word_title",
        icon: "world-icon",
        data: `${userStats.visitedPercentage.toFixed(2)}%`,
    },
    {
        title: "message.continent_title",
        icon: "continent-icon",
        data: userStats.visitedContinents,
        router_to: "/continent",
    },
]);
</script>

<style lang="scss">
.home_page_wrapper {
    gap: 25px;
}

.home_card_stats_container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 25px;
}
</style>
