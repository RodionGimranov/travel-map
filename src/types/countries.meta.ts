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
