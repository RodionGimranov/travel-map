<template>
    <div class="country_list_item" :style="{ minHeight: listItemHeight }">
        <p class="country_name">{{ country.name }}</p>
        <Chekbox :checkboxWidth="checkboxWidth" :checkboxHeight="checkboxHeight" />
    </div>
</template>

<script setup lang="ts">
import type { LocalizedCountry } from "@/composables/useLocalizedCountry";
import Chekbox from "@/components/ui/Chekbox/Chekbox.vue";

withDefaults(
    defineProps<{
        country: LocalizedCountry;
        listItemHeight?: string;
        checkboxWidth?: string;
        checkboxHeight?: string;
    }>(),
    {
        listItemHeight: "44px",
        checkboxWidth: "26px",
        checkboxHeight: "26px",
    },
);
</script>

<style lang="scss">
.country_list_item {
    width: 100%;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 12px;
    border: 1px solid transparent;

    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        background: $third_white;
        border-color: $fifth_gray;
    }
}

.country_name {
    font-size: 16px;
    font-weight: 400;
    color: $primary_dark;
}
</style>
