// @ts-check false
import fs from "node:fs";
import path from "node:path";

const CONTINENT_MAP = {
    Europe: "EU",
    Asia: "AS",
    Africa: "AF",
    "North America": "NA",
    "South America": "SA",
    Oceania: "OC",
};

const API_URL =
    "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,population,languages,currencies,continents";

const DATA_DIR = path.resolve(process.cwd(), "src/data");

async function buildCountries() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`Failed to fetch countries: ${response.status}`);
    }

    const rawCountries = await response.json();

    console.log(`Fetched ${rawCountries.length} raw countries`);

    let idCounter = 1;

    const countries = rawCountries
        .map((c) => {
            if (
                !c.cca2 ||
                !c.cca3 ||
                !Array.isArray(c.capital) ||
                !c.capital.length ||
                !Array.isArray(c.continents)
            ) {
                return null;
            }

            const continentIds = c.continents.map((name) => CONTINENT_MAP[name]).filter(Boolean);

            if (!continentIds.length) return null;

            const languages = c.languages
                ? Object.entries(c.languages).map(([code, name]) => ({
                      code,
                      name: { en: String(name), ru: String(name) },
                  }))
                : [];

            const currencies = c.currencies
                ? Object.entries(c.currencies).map(([code, currency]) => ({
                      code,
                      name: {
                          en: currency.name,
                          ru: currency.name,
                      },
                  }))
                : [];

            return {
                id: idCounter++,
                iso2: c.cca2,
                iso3: c.cca3,
                continentIds,
                name: {
                    en: c.name.common,
                    ru: c.name.common,
                },
                capital: {
                    en: c.capital[0],
                    ru: c.capital[0],
                },
                languages,
                currencies,
                population: c.population ?? 0,
            };
        })
        .filter(Boolean);

    const countriesPath = path.join(DATA_DIR, "countries.json");
    const metaPath = path.join(DATA_DIR, "countries.meta.json");

    fs.writeFileSync(countriesPath, JSON.stringify(countries, null, 2), "utf-8");

    const meta = {
        source: API_URL,
        generatedAt: new Date().toISOString(),
        count: countries.length,
        schemaVersion: 1,
    };

    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf-8");

    console.log(`✔ Generated ${countries.length} countries`);
    console.log(`📄 Saved countries to ${countriesPath}`);
    console.log(`📄 Saved meta to ${metaPath}`);
}

buildCountries().catch((err) => {
    console.error("❌ Failed to build countries");
    console.error(err);
    process.exit(1);
});
