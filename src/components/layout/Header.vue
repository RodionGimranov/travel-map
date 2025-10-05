<template>
    <header>
        <p class="header_logo_title">Travel Map</p>
        <div class="search_input_container">
            <Input
                ref="inputRef"
                v-model="query"
                :is-focused="isFocused"
                @focus="handleInputFocus"
                @blur="handleInputBlur"
                @clear="handleClearInput"
            />
            <Dropdown :is-open="dropdownStore.isOpen" :countries="filteredCountries" />
        </div>
        <nav>
            <Button :label="locale.toUpperCase()" :action="toggleLang" />
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { useDropdownStore } from "@/stores/dropdownStore";
import { useSearch } from "@/composables/useSearch";
import { useLocalizedCountries } from "@/composables/useLocalizedCountry";
import { useEscapeKeyClose } from "@/composables/useEscapeKey";

import Input from "@/components/ui/Input/Input.vue";
import Dropdown from "../ui/Dropdown/Dropdown.vue";
import Button from "@/components/ui/Button/Button.vue";

const { locale } = useI18n();

const dropdownStore = useDropdownStore();

const isFocused = ref(false);

const { localizedCountries } = useLocalizedCountries();
const { query, filteredCountries } = useSearch(localizedCountries);

const inputRef = ref<InstanceType<typeof Input> | null>(null);

const openDropdown = () => {
    dropdownStore.open();
};

const closeDropdown = () => {
    dropdownStore.close();
};

const handleInputFocus = () => {
    isFocused.value = true;
    openDropdown();
};

const handleInputBlur = () => {
    isFocused.value = false;
    closeDropdown();
};

const handleClearInput = () => {
    query.value = "";
};

const handleEscape = () => {
    if (inputRef.value) {
        inputRef.value.blurInput();
    }
};

const toggleLang = () => {
    locale.value = locale.value === "ru" ? "en" : "ru";
};

useEscapeKeyClose(handleEscape);
</script>

<style lang="scss">
header {
    position: relative;
    padding: 0 50px;
    margin-bottom: 50px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header_logo_title {
    font-size: 18px;
    font-weight: 600;
    color: $primary_dark;
}

.search_input_container {
    position: relative;
    width: 500px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
}
</style>
