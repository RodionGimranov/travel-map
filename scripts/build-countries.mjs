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
    Antarctica: "AN",
};

const API_URL =
    "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,population,languages,currencies,continents";

const DATA_DIR = path.resolve(process.cwd(), "src/data");

const SOURCE_DIR = path.join(DATA_DIR, "source");
const MANUAL_DIR = path.join(DATA_DIR, "manual");
const BUILD_DIR = path.join(DATA_DIR, "build");
const META_DIR = path.join(DATA_DIR, "meta");

const BASE_PATH = path.join(SOURCE_DIR, "countries.base.json");
const STATUS_PATH = path.join(MANUAL_DIR, "countries.status.json");
const FINAL_PATH = path.join(BUILD_DIR, "countries.data.json");
const META_PATH = path.join(META_DIR, "countries.meta.json");

function formatDateYYYYMMDDColon(date = new Date()) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}:${mm}:${dd}`;
}

async function buildCountries() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch countries: ${response.status}`);
    }

    const rawCountries = await response.json();
    console.log(`Fetched ${rawCountries.length} raw countries`);

    let idCounter = 1;

    // ---------- 1. BUILD BASE ----------
    const countriesBase = rawCountries
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
                      name: {
                          en: String(name),
                          ru: String(name),
                      },
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

    fs.mkdirSync(SOURCE_DIR, { recursive: true });
    fs.writeFileSync(BASE_PATH, JSON.stringify(countriesBase, null, 2), "utf-8");

    // ---------- 2. READ STATUS ----------
    if (!fs.existsSync(STATUS_PATH)) {
        throw new Error(`countries.status.json not found at ${STATUS_PATH}`);
    }

    const statusData = JSON.parse(fs.readFileSync(STATUS_PATH, "utf-8"));
    const unSet = new Set(statusData.UN ?? []);
    const obsSet = new Set(statusData.OBS ?? []);

    // ---------- 3. BUILD FINAL DATA ----------
    const countriesData = countriesBase.map((country) => ({
        ...country,
        status: unSet.has(country.iso2) ? "UN" : obsSet.has(country.iso2) ? "OBS" : "DISP",
    }));

    fs.mkdirSync(BUILD_DIR, { recursive: true });
    fs.writeFileSync(FINAL_PATH, JSON.stringify(countriesData, null, 2), "utf-8");

    // ---------- 4. META ----------
    const now = new Date();

    const meta = {
        source: API_URL,
        generatedAt: {
            iso: now.toISOString(),
            display: formatDateYYYYMMDDColon(now),
        },
        rawCount: rawCountries.length,
        baseCount: countriesBase.length,
        finalCount: countriesData.length,
        statuses: {
            UN: unSet.size,
            OBS: obsSet.size,
            DISP: countriesData.length - unSet.size - obsSet.size,
        },
        schemaVersion: 1,
    };

    fs.mkdirSync(META_DIR, { recursive: true });
    fs.writeFileSync(META_PATH, JSON.stringify(meta, null, 2), "utf-8");

    console.log(`✔ Base countries: ${countriesBase.length}`);
    console.log(`✔ Final countries: ${countriesData.length}`);
}

buildCountries().catch((err) => {
    console.error("❌ Failed to build countries");
    console.error(err);
    process.exit(1);
});
