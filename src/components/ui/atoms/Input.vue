<template>
    <div
        class="input_wrapper bg-secondary-white relative flex h-9.5 w-full items-center justify-start gap-2.5 rounded-xl border border-transparent"
    >
        <SvgIcon
            name="search-icon"
            :width="20"
            :height="20"
            class="pointer-events-none absolute left-3"
        />
        <input
            type="text"
            :value="modelValue"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            class="h-full w-full pl-10.5! text-[14px] font-medium"
            placeholder="Введите название страны"
        />
        <button
            v-if="modelValue"
            type="button"
            class="hover:text-primary-dark text-primary-gray absolute right-3 cursor-pointer"
            @mousedown.prevent
            @click="handleClear"
        >
            <SvgIcon name="clear-icon" :width="17" :height="17" />
        </button>
    </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/ui/atoms/SvgIcon.vue";

defineProps<{
    modelValue: string;
}>();

const emit = defineEmits<{
    (event: "update:modelValue", value: string): void;
    (event: "focus"): void;
    (event: "blur"): void;
}>();

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
    &:focus-within {
        border-color: $black-10;
    }
}

input::placeholder {
    color: $primary-gray;
    font-weight: 400;
}
</style>
