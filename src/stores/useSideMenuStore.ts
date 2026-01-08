import { defineStore } from "pinia";

type SideMenuType = "countries" | "settings" | null;

interface SideMenuState {
    isOpen: boolean;
    activeMenu: SideMenuType;
    ignoreOutsideRefs: HTMLElement[];
}

export const useSideMenuStore = defineStore("sideMenu", {
    state: (): SideMenuState => ({
        isOpen: false,
        activeMenu: null,
        ignoreOutsideRefs: [],
    }),

    getters: {
        isCountriesMenuOpen(state): boolean {
            return state.isOpen && state.activeMenu === "countries";
        },

        isSettingsMenuOpen(state): boolean {
            return state.isOpen && state.activeMenu === "settings";
        },
    },

    actions: {
        open(menu: SideMenuType) {
            this.isOpen = true;
            this.activeMenu = menu;
        },

        close() {
            this.isOpen = false;
            this.activeMenu = null;
        },

        toggle(menu: SideMenuType) {
            if (this.isOpen && this.activeMenu === menu) {
                this.close();
            } else {
                this.open(menu);
            }
        },

        registerIgnoreOutside(el: HTMLElement | null) {
            if (el && !this.ignoreOutsideRefs.includes(el)) {
                this.ignoreOutsideRefs.push(el);
            }
        },
    },
});
