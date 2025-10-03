<template>
    <div v-if="!$route.meta.hideHeaderInput" class="input_wrapper" :class="{ _focused: isFocused }">
        <button class="search_btn">
            <SvgIcon name="search-icon" />
        </button>
        <input
            ref="searchInput"
            type="text"
            v-model="searchQuery"
            :placeholder="t('message.input_placeholder')"
            :class="{ _with_text: withText }"
            @focus="handleFocus"
            @blur="handleBlur"
        />
        <CountryRequest :show="!isFocused && searchQuery.length === 0" />
        <button
            v-show="searchQuery.length > 0"
            class="clear_input_btn"
            @click="clearInput"
            @mousedown.prevent="clearInput"
        >
            <SvgIcon name="clear-icon" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

import { useDropdownStore } from "@/stores/dropdownStore";
import { useEscapeKeyClose } from "@/composables/useEscapeKey";

import SvgIcon from "@/components/ui/SvgIcon/SvgIcon.vue";
import CountryRequest from "@/components/CountryRequest.vue";

const { t } = useI18n();
const dropdownStore = useDropdownStore();

const searchInput = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const searchQuery = ref("");

const withText = computed(() => !isFocused.value && searchQuery.value.length > 0);

const clearInput = () => {
    searchQuery.value = "";
};

const handleFocus = () => {
    isFocused.value = true;
    dropdownStore.open();
};

const handleBlur = () => {
    isFocused.value = false;
    dropdownStore.close();
};

const handleEscape = () => {
    if (searchInput.value) {
        searchInput.value.blur();
    }
    handleBlur();
};

useEscapeKeyClose(handleEscape);
</script>

<style lang="scss">
.input_wrapper {
    position: relative;
    width: 100%;
    height: 38px;
    overflow: hidden;
    transition: 0.2s;
    border-radius: 12px;
    background: $secondary_gray;
    border: 1px solid transparent;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;

    &._focused {
        background: $primary_white;
        border-color: $secondary_white;
    }
}

.search_btn {
    position: absolute;
    top: 9px;
    left: 12px;
    max-height: 20px;
    pointer-events: none;
}

input {
    width: 100%;
    height: 100%;
    cursor: pointer;
    padding-left: 40px;

    font-size: 14px;
    font-weight: 500;
    color: $primary_dark;

    &._with_text {
        color: $fourth_gray;
    }

    &::placeholder {
        opacity: 0;
        transition: 0.2s;

        color: $fourth_gray;
        font-weight: 500;
    }

    &:focus::placeholder {
        opacity: 1;
    }
}

.clear_input_btn {
    position: absolute;
    top: 9px;
    right: 12px;
    max-height: 20px;
    color: $fourth_white;
}
</style>
