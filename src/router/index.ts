import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    { path: "/", redirect: "/home" },
    {
        path: "/home",
        name: "homePage",
        component: () => import("@/pages/HomePage.vue"),
        meta: { titleKey: "TravelMap" },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
