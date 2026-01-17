<template>
    <aside
        v-if="sideMenuStore.isOpen"
        ref="sideMenuRef"
        class="common_side_menu z-50 flex h-137.75 flex-col items-start"
        :class="sideMenuSizeClass"
    >
        <div class="mb-6.5! flex w-full items-start justify-between gap-2">
            <div class="flex items-start justify-center gap-2">
                <p class="text-primary-dark text-[20px] leading-6 font-medium">
                    <template v-if="sideMenuStore.isCountriesMenuOpen">
                        {{ countriesStore.selectedCountryView?.name }}
                    </template>
                    <template v-else>
                        {{ $t("sideMenu.menu_title") }}
                    </template>
                </p>
                <Badge
                    v-if="sideMenuStore.isCountriesMenuOpen && countryBadge"
                    :label="countryBadge.label"
                    :badge-type="countryBadge.badgeType"
                />
            </div>
            <CloseButton @click="sideMenuStore.close" />
        </div>
        <SettingsMenu v-if="sideMenuStore.isSettingsMenuOpen" />
        <CountriesMenu v-else-if="sideMenuStore.isCountriesMenuOpen" />
    </aside>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";

import { useSideMenuStore } from "@/stores/useSideMenuStore";
import { useCountriesStore } from "@/stores/useCountriesStore";
import { useEscapeKey } from "@/composables/useEscapeKey";
import { useCountryBadge } from "@/composables/useCountryBadge";

import CloseButton from "@/components/ui/atoms/CloseButton.vue";
import SettingsMenu from "@/components/layout/SideMenu/SettingsMenu.vue";
import CountriesMenu from "@/components/layout/SideMenu/CountriesMenu.vue";
import Badge from "@/components/ui/atoms/Badge.vue";

const sideMenuStore = useSideMenuStore();
const countriesStore = useCountriesStore();

const sideMenuRef = ref<HTMLElement | null>(null);

const sideMenuSizeClass = computed(() => {
    const map = {
        settings: "w-100",
        countries: "w-90.25",
    } as const;

    return sideMenuStore.activeMenu ? map[sideMenuStore.activeMenu] : "";
});

const { countryBadge } = useCountryBadge(() => countriesStore.selectedCountryView ?? null);

useEscapeKey(() => {
    sideMenuStore.close();
});

onClickOutside(sideMenuRef, () => sideMenuStore.close(), {
    ignore: sideMenuStore.ignoreOutsideRefs,
});
</script>

<style lang="scss">
.common_side_menu {
    position: absolute;
    top: 66px;
    right: 16px;
    padding: 12px;
    overflow: hidden;
    border-radius: 22px;
    backdrop-filter: blur(4px);
    background: var(--white-90);
    border: 1px solid var(--black-10);
    box-shadow: 0px 3px 11px var(--black-12);
}
</style>
