<template>
    <Header />
    <main><router-view /></main>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

import Header from "@/components/layout/Header.vue";
</script>

<style lang="scss">
main {
    width: 900px;   
    padding: 0 50px;
    background: $primary_white;
    border: 1px solid green;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>
