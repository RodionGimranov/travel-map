import { createI18n } from "vue-i18n";

import globalJson from "@/locales/global.json";
import countriesStatJson from "@/locales/pages/countriesStat.json";
import continentStatJson from "@/locales/pages/continentStat.json";

interface Messages {
    ru: { message: Record<string, any> };
    en: { message: Record<string, any> };
}

const global = globalJson as Messages;
const countriesStat = countriesStatJson as Messages;
const continentStat = continentStatJson as Messages;

const i18n = createI18n({
    legacy: false,
    locale: "ru",
    fallbackLocale: "ru",
    silentTranslationWarn: true,
    messages: {
        ru: {
            message: {
                ...global.ru.message,
                ...countriesStat.ru.message,
                ...continentStat.ru.message,
            },
        },
        en: {
            message: {
                ...global.en.message,
                ...countriesStat.en.message,
                ...continentStat.en.message,
            },
        },
    },
});

export default i18n;
