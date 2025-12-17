import { createApp } from "vue";

import { pinia } from "@/plugins/pinia";
import router from "@/router";

import "./assets/tailwind.css";

import App from "./App.vue";

const app = createApp(App);

app.use(pinia).use(router);

app.mount("#app");
