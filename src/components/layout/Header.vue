<template>
    <header class="mb-12.5 flex w-full items-center justify-between">
        <p class="text-primary-dark text-[18px] font-medium">Travel Map</p>
        <CountrySearch />
        <nav class="flex items-center justify-center gap-3">
            <SquareButton :label="buttonLabel" @click="toggleLanguage" />
            <SquareButton
                icon="menu-icon"
                :iconSizeW="24"
                :iconSizeH="24"
                @click="sideMenuStore.toggle('settings')"
            />
        </nav>
    </header>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { useLanguageStore } from "@/stores/useLanguageStore";
import { useSideMenuStore } from "@/stores/useSideMenuStore";

import CountrySearch from "@/components/CountrySearch/CountrySearch.vue";
import SquareButton from "@/components/ui/atoms/SquareButton.vue";

const languageStore = useLanguageStore();
const sideMenuStore = useSideMenuStore();

const currentLocale = computed(() => languageStore.locale);

const buttonLabel = computed(() => (currentLocale.value === "ru" ? "Ru" : "En"));

const toggleLanguage = () => {
    const nextLocale = currentLocale.value === "ru" ? "en" : "ru";
    languageStore.setLocale(nextLocale);
};
</script>

<style lang="scss"></style>
