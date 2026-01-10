import { computed } from "vue";

type CountryStatus = "DISP" | "UN" | "OBS";
type BadgeType = "gray" | "blue" | "amber";

interface CountryBadge {
    label: string;
    badgeType: BadgeType;
}

interface CountryWithStatus {
    status: CountryStatus;
}

export function useCountryBadge(country: () => CountryWithStatus | null) {
    const countryBadge = computed<CountryBadge | null>(() => {
        const status = country()?.status;
        if (!status) return null;

        const STATUS_MAP: Record<CountryStatus, CountryBadge> = {
            DISP: { label: "DISP", badgeType: "gray" },
            UN: { label: "UN", badgeType: "blue" },
            OBS: { label: "OBS", badgeType: "amber" },
        };

        return STATUS_MAP[status];
    });

    return {
        countryBadge,
    };
}
