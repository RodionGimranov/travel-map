<template>
    <Header />
    <SideMenu />
    <main>
        <RouterView />
    </main>
</template>

<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
import SideMenu from "@/components/layout/SideMenu/SideMenu.vue";
</script>

<style lang="scss"></style>
