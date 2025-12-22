import { createApp } from "vue";

import { pinia } from "@/plugins/pinia";
import { i18n } from "@/plugins/vue-i18n";
import router from "@/router";

import "./assets/tailwind.css";

import App from "./App.vue";

const app = createApp(App);

app.use(pinia).use(router).use(i18n);

app.mount("#app");
