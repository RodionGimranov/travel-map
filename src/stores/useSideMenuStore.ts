import { defineStore } from "pinia";

export type SideMenuType = "settings" | "countries" | null;

export const useSideMenuStore = defineStore("sideMenu", {
    state: () => ({
        activeMenu: null as SideMenuType,
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

        toggle(menu: Exclude<SideMenuType, null>) {
            this.activeMenu = this.activeMenu === menu ? null : menu;
        },

        close() {
            this.activeMenu = null;
        },
    },
});
