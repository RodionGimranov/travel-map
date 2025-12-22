import ruCommon from "./ru/common.json";

import enCommon from "./en/common.json";

export const messages = {
    ru: {
        common: ruCommon,
    },
    en: {
        common: enCommon,
    },
};

export type Locale = keyof typeof messages;
