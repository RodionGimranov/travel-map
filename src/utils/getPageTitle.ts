import type { RouteLocationNormalized } from "vue-router";
import i18n from "@/libs/vue-i18n/vue-i18n";

export function getPageTitle(route: RouteLocationNormalized, locale?: string): string {
    const titleKey = route.meta?.titleKey as string | undefined;
    if (!titleKey) return "Travel Map";

    const baseTitle = i18n.global.t(titleKey as any);

    return baseTitle;
}
