import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    { path: "/", redirect: "/home" },
    {
        path: "/home",
        name: "homePage",
        component: () => import("@/pages/HomePage.vue"),
        meta: { title: "TravelMap", hideHomeBtn: true },
    },
    {
        path: "/countries",
        name: "countriesPage",
        component: () => import("@/pages/CountriesPage.vue"),
        meta: { title: "Countries" },
    },
    {
        path: "/continents",
        name: "continentsPage",
        component: () => import("@/pages/ContinentsPage.vue"),
        meta: { title: "Continents" },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
