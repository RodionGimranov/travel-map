<template>
    <aside
        v-if="sideMenuStore.isOpen"
        ref="sideMenuRef"
        class="common_side_menu justify-start` flex h-137.75 flex-col items-start"
        :class="sideMenuSizeClass"
    >
        <div class="side_menu_header mb-6.5! flex w-full items-center justify-between">
            <p class="text-primary-dark text-[20px] font-medium">
                <template v-if="sideMenuTitle">
                    {{ sideMenuTitle }}
                </template>
                <template v-else>
                    {{ $t("sideMenu.side_menu_title") }}
                </template>
            </p>
            <CloseButton @click="sideMenuStore.close" />
        </div>
        <SettingsMenu v-if="sideMenuStore.isSettingsMenuOpen" />
        <CountriesMenu v-else-if="sideMenuStore.isCountriesMenuOpen" />
        <div class="side_menu_footer w-full"></div>
    </aside>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useI18n } from "vue-i18n";

import { useSideMenuStore } from "@/stores/useSideMenuStore";
import { useEscapeKey } from "@/composables/useEscapeKey";

import countries from "@/data/countries.data.json";

import CloseButton from "@/components/ui/atoms/CloseButton.vue";
import SettingsMenu from "@/components/layout/SideMenu/SettingsMenu.vue";
import CountriesMenu from "@/components/layout/SideMenu/CountriesMenu.vue";

const sideMenuStore = useSideMenuStore();
const sideMenuRef = ref<HTMLElement | null>(null);

const { locale } = useI18n();

type CountryLocale = "en" | "ru";

onClickOutside(
    sideMenuRef,
    () => {
        sideMenuStore.close();
    },
    {
        ignore: sideMenuStore.ignoreOutsideRefs,
    },
);

const currentLocale = computed<CountryLocale>(() => (locale.value === "ru" ? "ru" : "en"));

const selectedCountry = computed(() => {
    if (!sideMenuStore.selectedCountryIso2) return null;

    return countries.find((c) => c.iso2 === sideMenuStore.selectedCountryIso2);
});

const sideMenuTitle = computed(() => {
    if (sideMenuStore.isCountriesMenuOpen && selectedCountry.value) {
        return selectedCountry.value.name[currentLocale.value] ?? selectedCountry.value.name.en;
    }

    return null;
});

const sideMenuSizeClass = computed(() => {
    const map = {
        settings: "w-113.25",
        countries: "w-90.25",
    } as const;

    return sideMenuStore.activeMenu ? map[sideMenuStore.activeMenu] : "";
});

useEscapeKey(() => {
    sideMenuStore.close();
});
</script>

<style lang="scss">
.common_side_menu {
    position: absolute;
    top: 66px;
    right: 16px;
    padding: 16px;
    overflow: hidden;
    border-radius: 22px;
    backdrop-filter: blur(4px);
    background: var(--white-90);
    border: 1px solid var(--black-10);
    box-shadow: 0px 3px 11px var(--black-012);
}
</style>
