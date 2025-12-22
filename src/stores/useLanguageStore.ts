import { defineStore } from "pinia";
import { i18n } from "@/plugins/vue-i18n";
import type { Locale } from "@/locales";

const STORAGE_KEY = "locale";

export const useLanguageStore = defineStore("language", {
    state: () => ({
        locale: i18n.global.locale.value as Locale,
    }),

    actions: {
        setLocale(locale: Locale) {
            if (this.locale === locale) return;

            this.locale = locale;
            i18n.global.locale.value = locale;
            localStorage.setItem(STORAGE_KEY, locale);
        },

        init() {
            const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null;

            if (savedLocale) {
                this.setLocale(savedLocale);
            }
        },
    },
});
