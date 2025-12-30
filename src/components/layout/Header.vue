<template>
    <header class="relative mb-12.5! flex w-full items-center justify-between">
        <p class="text-primary-dark z-10 text-[18px] font-medium">Travel Map</p>
        <div class="absolute flex w-full items-center justify-center">
            <CountrySearch />
        </div>
        <nav class="z-10 flex items-center justify-center gap-3">
            <RouterLink to="/home">
                <SquareButton
                    v-if="!$route.meta.hideHomeBtn"
                    label="common.home_page"
                    :padding-x="12"
                />
            </RouterLink>
            <SquareButton
                ref="languageButtonRef"
                :label="buttonLabel"
                @mousedown.prevent
                @click="toggleLanguage"
            />
            <SquareButton
                ref="menuButtonRef"
                icon="menu-icon"
                :iconSizeW="24"
                :iconSizeH="24"
                @click="sideMenuStore.toggle('settings')"
            />
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { useLanguageStore } from "@/stores/useLanguageStore";
import { useSideMenuStore } from "@/stores/useSideMenuStore";

import CountrySearch from "@/components/CountrySearch/CountrySearch.vue";
import SquareButton from "@/components/ui/atoms/SquareButton.vue";

const languageStore = useLanguageStore();
const sideMenuStore = useSideMenuStore();

const languageButtonRef = ref<HTMLElement | null>(null);
const menuButtonRef = ref<HTMLElement | null>(null);

const currentLocale = computed(() => languageStore.locale);

const buttonLabel = computed(() => (currentLocale.value === "ru" ? "Ru" : "En"));

const toggleLanguage = () => {
    const nextLocale = currentLocale.value === "ru" ? "en" : "ru";
    languageStore.setLocale(nextLocale);
};

onMounted(() => {
    sideMenuStore.registerIgnoreOutside(languageButtonRef.value);
    sideMenuStore.registerIgnoreOutside(menuButtonRef.value);
});
</script>

<style lang="scss"></style>
