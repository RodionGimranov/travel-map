import type { ContinentId } from "@/types";

export interface LocalizedText {
    ru: string;
    en: string;
}

export interface CountryLanguage {
    code: string;
    name: LocalizedText;
}

export interface CountryCurrency {
    code: string;
    name: LocalizedText;
}

export interface Country {
    id: number;
    iso2: string;
    iso3: string;
    continentIds: ContinentId[];
    name: LocalizedText;
    capital: LocalizedText;
    languages: CountryLanguage[];
    currencies: CountryCurrency[];
    population: number;
}
