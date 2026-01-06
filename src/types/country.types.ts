// континенты
import type { ContinentId } from "@/types";

// локали
export interface LocalizedText {
    ru: string;
    en: string;
}

// статус
export type CountryStatus = "UN" | "OBS" | "DISP";

// офф язык
export interface CountryLanguageRaw {
    code: string;
    name: LocalizedText;
}

// валюта
export interface CountryCurrencyRaw {
    code: string;
    name: LocalizedText;
}

// сырые данные
export interface CountryRaw {
    id: number;
    iso2: string;
    iso3: string;
    continentIds: ContinentId[];

    name: LocalizedText;
    capital: LocalizedText;

    languages: CountryLanguageRaw[];
    currencies: CountryCurrencyRaw[];

    population: number;

    status?: CountryStatus;

    visited?: boolean;
}

// данные для клиента
export interface CountryView {
    iso2: string;

    name: string;
    capital: string;

    population: number;
    status?: CountryStatus;

    visited: boolean;

    continents: string[];
    currencies: string[];
    languages: string[];
}

// использую в поисковике
export interface CountryOptionItem {
    iso2: string;
    label: string;
}

// меда данные
export interface CountriesMeta {
    source: string;
    generatedAt: {
        iso: string;
        display: string;
    };
    rawCount: number;
    baseCount: number;
    finalCount: number;
    statuses: {
        UN: number;
        OBS: number;
        DISP: number;
    };
    schemaVersion: number;
}
