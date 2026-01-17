<template>
    <header class="relative mb-12.5! flex w-full items-center justify-between">
        <p class="text-primary-dark z-10 text-[18px] leading-5.5 font-medium">Travel Map</p>
        <div class="absolute flex w-full items-center justify-center">
            <CountrySearch />
        </div>
        <nav class="z-10 flex items-center justify-center gap-3">
            <RouterLink to="/home">
                <Button
                    v-if="!$route.meta.hideHomeBtn"
                    label="common.home_page"
                    padding-variant="medium"
                />
            </RouterLink>
            <Tooltip tooltipText="common.change_language_title" placement="bottom">
                <Button ref="languageButtonRef" :label="buttonLabel" @click="toggleLanguage" />
            </Tooltip>
            <Tooltip tooltipText="sideMenu.menu_title" placement="bottom">
                <Button ref="menuButtonRef" @click="sideMenuStore.toggle('settings')">
                    <SvgIcon name="menu-icon" :width="24" :height="24" />
                </Button>
            </Tooltip>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { useLanguageStore } from "@/stores/useLanguageStore";
import { useSideMenuStore } from "@/stores/useSideMenuStore";

import CountrySearch from "@/components/CountrySearch/CountrySearch.vue";
import Button from "@/components/ui/atoms/Button.vue";
import SvgIcon from "@/components/ui/atoms/SvgIcon.vue";
import Tooltip from "@/components/ui/atoms/Tooltip.vue";

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
