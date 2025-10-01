<template>
    <header>
        <p class="header_logo_title">Travel Map</p>
        <div class="search_input_container"><Input /></div>
        <nav><Button :label="locale.toUpperCase()" :action="toggleLang" /></nav>
    </header>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

import Input from "@/components/ui/Input/Input.vue";
import Button from "@/components/ui/Button/Button.vue";

const { locale } = useI18n();

const toggleLang = () => {
    locale.value = locale.value === "ru" ? "en" : "ru";
};
</script>

<style lang="scss">
header {
    position: relative;
    padding: 0 50px;
    margin-bottom: 100px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header_logo_title {
    font-size: 18px;
    font-weight: 600;
    color: $primary_dark;
}
</style>
