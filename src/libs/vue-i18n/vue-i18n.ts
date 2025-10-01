import { createI18n } from "vue-i18n";

import globalJson from "@/locales/global.json";

interface Messages {
    ru: { message: Record<string, string> };
    en: { message: Record<string, string> };
}

const global = globalJson as Messages;

const i18n = createI18n({
    legacy: false,
    locale: "ru",
    fallbackLocale: "ru",
    silentTranslationWarn: true,
    messages: {
        ru: {
            message: { ...global.ru.message },
        },
        en: {
            message: { ...global.en.message },
        },
    },
});

export default i18n;
