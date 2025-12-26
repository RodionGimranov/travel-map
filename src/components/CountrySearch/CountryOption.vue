<template>
    <div
        @mousedown.prevent="emit('select', item.iso2)"
        class="hover:bg-third-white flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3! py-2!"
    >
        <p class="text-primary-dark text-[16px] font-normal">
            {{ item.label }}
        </p>
    </div>
</template>

<script setup lang="ts">
import type { CountryOptionItem } from "@/types/country.types";

defineProps<{
    item: CountryOptionItem;
}>();

const emit = defineEmits<{
    (event: "select", iso2: string): void;
}>();
</script>

<style lang="scss"></style>
