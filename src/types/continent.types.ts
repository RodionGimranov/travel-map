export type ContinentId = "EU" | "AS" | "AF" | "NA" | "SA" | "OC" | "AN";

export interface Continent {
    id: ContinentId;
    name: {
        ru: string;
        en: string;
    };
}
