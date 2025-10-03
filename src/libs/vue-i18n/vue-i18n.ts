import { createI18n } from "vue-i18n";

import globalJson from "@/locales/global.json";
import { getLocalizedCountries } from "@/composables/useLocalizedCountry";

interface Messages {
    ru: { message: Record<string, any> };
    en: { message: Record<string, any> };
}

const global = globalJson as Messages;

const i18n = createI18n({
    legacy: false,
    locale: "ru",
    fallbackLocale: "ru",
    silentTranslationWarn: true,
    messages: {
        ru: {
            message: {
                ...global.ru.message,
                countries: getLocalizedCountries("ru"),
            },
        },
        en: {
            message: {
                ...global.en.message,
                countries: getLocalizedCountries("en"),
            },
        },
    },
});

export default i18n;
