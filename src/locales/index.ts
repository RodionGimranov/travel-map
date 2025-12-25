import ruCommon from "./ru/common.json";
import ruStats from "./ru/stats.json";

import enCommon from "./en/common.json";
import enStats from "./en/stats.json";

export const messages = {
    ru: {
        common: ruCommon,
        stats: ruStats,
    },
    en: {
        common: enCommon,
        stats: enStats,
    },
};

export type Locale = keyof typeof messages;
