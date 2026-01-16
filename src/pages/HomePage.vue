<template>
    <section class="home-page flex h-full w-full items-end justify-center">
        <div class="flex items-start justify-start gap-6.25">
            <WorldStatsCard
                v-for="card in worldStatsCards"
                :key="card.title"
                :title="card.title"
                :value="card.value"
                :icon="card.icon"
                :has-link="card.hasLink"
                :link-to="card.linkTo"
            />
        </div>
    </section>
    <DottedBackground />
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useTravelStatsStore } from "@/stores/useTravelStatsStore";

import WorldStatsCard from "@/components/ui/organisms/WorldStatsCard.vue";
import DottedBackground from "@/components/ui/atoms/DottedBackground.vue";

const travelStatsStore = useTravelStatsStore();

interface WorldStatsCardConfig {
    title: string;
    icon: string;
    value?: string;
    hasLink: boolean;
    linkTo?: string;
}

const worldStatsCards = computed<WorldStatsCardConfig[]>(() => [
    {
        title: "stats.countries_title",
        icon: "countries-icon",
        value: travelStatsStore.visitedFromStatTotal,
        hasLink: true,
        linkTo: "/countries",
    },
    {
        title: "stats.world_title",
        icon: "world-icon",
        value: travelStatsStore.visitedAllPercentRounded,
        hasLink: false,
    },
    {
        title: "stats.continents_title",
        icon: "continent-icon",
        value: travelStatsStore.visitedContinentsFromTotal,
        hasLink: true,
        linkTo: "/continents",
    },
]);
</script>

<style lang="scss"></style>
