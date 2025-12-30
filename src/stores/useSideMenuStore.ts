import { defineStore } from "pinia";

export type SideMenuType = "settings" | "countries" | null;

export const useSideMenuStore = defineStore("sideMenu", {
    state: () => ({
        activeMenu: null as SideMenuType,
        selectedCountryIso2: null as string | null,
        ignoreOutsideRefs: [] as HTMLElement[],
    }),

    getters: {
        isOpen: (state) => state.activeMenu !== null,
        isSettingsMenuOpen: (state) => state.activeMenu === "settings",
        isCountriesMenuOpen: (state) => state.activeMenu === "countries",
    },

    actions: {
        open(menu: SideMenuType) {
            this.activeMenu = menu;
        },

        openCountry(iso2: string) {
            this.activeMenu = "countries";
            this.selectedCountryIso2 = iso2;
        },

        toggle(menu: Exclude<SideMenuType, null>) {
            this.activeMenu = this.activeMenu === menu ? null : menu;
        },

        close() {
            this.activeMenu = null;
            this.selectedCountryIso2 = null;
        },

        registerIgnoreOutside(el: HTMLElement | null) {
            if (el && !this.ignoreOutsideRefs.includes(el)) {
                this.ignoreOutsideRefs.push(el);
            }
        },
    },
});
