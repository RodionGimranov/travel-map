<template>
    <header class="mb-12.5 flex w-full items-center justify-between">
        <p class="text-primary-dark text-[18px] font-medium">Travel Map</p>
        <CountrySearch />
        <nav class="flex items-center justify-center gap-3"><MenuButton /></nav>
    </header>
</template>

<script setup lang="ts">
import CountrySearch from "@/components/country/CountrySearch.vue";
import MenuButton from "@/components/ui/atoms/MenuButton.vue";
</script>

<style lang="scss"></style>
