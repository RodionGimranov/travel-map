import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    { path: "/", redirect: "/Home" },
    {
        path: "/home",
        name: "home",
        component: () => import("@/views/HomePage.vue"),
        meta: { titleKey: "message.home_tab_title" },
    },
    {
        path: "/countries-stat",
        name: "countries-stat",
        component: () => import("@/views/CountriesStatPage.vue"),
        meta: { titleKey: "message.countries_tab_title" },
    },
    {
        path: "/continent-stat",
        name: "continent-stat",
        component: () => import("@/views/ContinentStatPage.vue"),
        meta: { titleKey: "message.continent_tab_title" },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
