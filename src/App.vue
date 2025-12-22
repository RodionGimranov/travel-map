<template>
    <Header />
    <SideMenu />
    <main>
        <RouterView />
    </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useLanguageStore } from "@/stores/useLanguageStore";

import Header from "@/components/layout/Header.vue";
import SideMenu from "@/components/layout/SideMenu/SideMenu.vue";

const languageStore = useLanguageStore();

onMounted(() => {
    languageStore.init();
});
</script>

<style lang="scss"></style>
