<template>
    <div v-if="isOpen" class="dropdown_container">
        <div class="country_list">
            <CountryListItem
                v-for="country in countries"
                :key="country.id"
                :country="country"
                listItemHeight="36px"
                checkboxWidth="24px"
                checkboxHeight="24px"
            />
            <p v-show="countries.length === 0" class="no_result_message">
                {{ $t("message.no_result_title") }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LocalizedCountry } from "@/composables/useLocalizedCountry";

import CountryListItem from "@/components/ui/CountryListItem/CountryListItem.vue";

defineProps<{
    countries: LocalizedCountry[];
    isOpen: boolean;
}>();
</script>

<style lang="scss">
.dropdown_container {
    position: absolute;
    top: 48px;
    left: 0;
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-radius: 12px;
    padding: 10px 0 10px 10px;
    background: $primary_white;
    border: 1px solid $secondary_white;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.country_list {
    width: 100%;
    height: 100%;
    overflow: scroll;
    padding-right: 10px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.no_result_message {
    width: 100%;
    margin: 20px 0;

    font-size: 16px;
    font-weight: 400;
    color: $third_gray;
    text-align: center;
}
</style>
