import ruCommon from "./ru/common.json";
import ruSideMenu from "./ru/sideMenu.json";
import ruStats from "./ru/stats.json";

import enCommon from "./en/common.json";
import enSideMenu from "./en/sideMenu.json";
import enStats from "./en/stats.json";

export const messages = {
    ru: {
        common: ruCommon,
        sideMenu: ruSideMenu,
        stats: ruStats,
    },
    en: {
        common: enCommon,
        sideMenu: enSideMenu,
        stats: enStats,
    },
};

export type Locale = keyof typeof messages;
