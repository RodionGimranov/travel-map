<template>
    <div
        class="input_wrapper relative flex h-9.5 w-full items-center justify-start gap-2.5 rounded-xl"
    >
        <SvgIcon
            name="search-icon"
            :width="20"
            :height="20"
            class="pointer-events-none absolute left-3"
        />
        <input
            ref="inputRef"
            type="text"
            :value="modelValue"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            class="h-full w-full pl-10.5! text-[14px] font-medium"
            :placeholder="placeholder"
        />
        <button
            v-if="modelValue"
            type="button"
            class="hover:text-primary-dark text-primary-gray absolute right-3 flex items-center justify-center"
            @mousedown.prevent
            @click="handleClear"
        >
            <SvgIcon name="clear-icon" :width="17" :height="17" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import SvgIcon from "@/components/ui/atoms/SvgIcon.vue";

const inputRef = ref<HTMLInputElement | null>(null);

defineProps<{
    modelValue: string;
    placeholder?: string;
}>();

const emit = defineEmits<{
    (event: "update:modelValue", value: string): void;
    (event: "focus"): void;
    (event: "blur"): void;
}>();

defineExpose({
    focus: () => {
        inputRef.value?.focus();
    },
    blur: () => {
        inputRef.value?.blur();
    },
});

const handleInput = (event: Event) => {
    emit("update:modelValue", (event.target as HTMLInputElement).value);
};

const handleFocus = () => {
    emit("focus");
};

const handleBlur = () => {
    emit("blur");
};

const handleClear = () => {
    emit("update:modelValue", "");
};
</script>

<style lang="scss">
.input_wrapper {
    background: transparent;
    border: 1px solid var(--color-black-10);

    &:focus-within {
        border-color: var(--color-primary-blue);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }
}

input::placeholder {
    color: var(--primary-gray);
    font-weight: 400;
}
</style>
