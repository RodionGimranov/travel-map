import countries from "@/data/countries.json";

export interface LocalizedCountry {
    id: number;
    iso2: string;
    iso3: string;
    continentId: string;
    name: string;
}

export const getLocalizedCountries = (locale: "ru" | "en") =>
    countries.map(
        (country): LocalizedCountry => ({
            id: country.id,
            iso2: country.iso2,
            iso3: country.iso3,
            continentId: country.continentId,
            name: country.name[locale],
        }),
    );
