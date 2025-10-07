import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    { path: "/", redirect: "/home" },
    {
        path: "/home",
        name: "home",
        component: () => import("@/views/HomePage.vue"),
        meta: { titleKey: "message.home_tab_title" },
    },
    {
        path: "/countries",
        name: "countries",
        component: () => import("@/views/CountriesStatPage.vue"),
        meta: { titleKey: "message.countries_title", hideHeaderInput: true },
    },
    {
        path: "/continent",
        name: "continent",
        component: () => import("@/views/ContinentStatPage.vue"),
        meta: { titleKey: "message.continent_title", hideHeaderInput: true },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
