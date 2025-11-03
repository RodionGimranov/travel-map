<template>
    <div v-if="!$route.meta.hideHeaderInput" class="input_wrapper" :class="{ _focused: isFocused }">
        <SvgIcon name="search-icon" class="search_icon" />
        <input
            ref="searchInput"
            type="text"
            :value="modelValue"
            @input="handleInput"
            :placeholder="t('message.input_placeholder')"
            :class="{ _with_text: withText }"
            @focus="handleFocus"
            @blur="handleBlur"
        />
        <CountryRequest :show="!isFocused && modelValue.length === 0" />
        <button
            v-show="modelValue.length > 0"
            class="clear_input_btn"
            @click="handleClear"
            @mousedown.prevent="handleClear"
        >
            <SvgIcon name="clear-icon" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

import SvgIcon from "@/components/ui/SvgIcon/SvgIcon.vue";
import CountryRequest from "@/components/CountryRequest.vue";

const { t } = useI18n();

const props = defineProps<{
    modelValue: string;
    isFocused?: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
    (e: "focus"): void;
    (e: "blur"): void;
    (e: "clear"): void;
}>();

const searchInput = ref<HTMLInputElement | null>(null);

const withText = computed(() => !props.isFocused && props.modelValue.length > 0);

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
};

const blurInput = () => {
    if (searchInput.value) {
        searchInput.value.blur();
    }
};

const handleFocus = () => {
    emit("focus");
};

const handleBlur = () => {
    emit("blur");
};

const handleClear = () => {
    emit("clear");
};

defineExpose({
    blurInput,
});
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

.search_icon {
    position: absolute;
    top: 9px;
    left: 12px;
    max-height: 20px;
    pointer-events: none;
}

input {
    width: 100%;
    height: 100%;
    cursor: text;
    padding-left: 40px;

    font-size: 14px;
    font-weight: 400;
    color: $primary_dark;

    &._with_text {
        color: $fourth_gray;
    }

    &::placeholder {
        opacity: 0;
        transition: 0.2s;

        color: $fourth_gray;
        font-weight: 400;
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
