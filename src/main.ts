import { createApp, watch } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import i18n from "@/libs/vue-i18n/vue-i18n";

import { getPageTitle } from "@/utils/getPageTitle";

const app = createApp(App);
const pinia = createPinia();

router.beforeEach((to, from, next) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = getPageTitle(to, i18n.global.locale.value);
    next();
});

watch(
    () => i18n.global.locale.value,
    (locale) => {
        document.title = getPageTitle(router.currentRoute.value, locale);
    },
);

app.use(router).use(i18n).use(pinia);

app.mount("#app");
