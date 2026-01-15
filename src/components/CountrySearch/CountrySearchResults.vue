<template>
    <div
        class="border-black-10 bg-white-90 absolute top-11.5 flex max-h-70 min-h-30 w-full flex-col overflow-hidden rounded-xl border shadow-[0_3px_11px_var(--black-12)] backdrop-blur-xs"
    >
        <div v-if="countries.length" class="w-full overflow-auto p-1.5!">
            <CountryOption
                v-for="country in countries"
                :key="country.iso2"
                :item="country"
                @select="emit('select', $event)"
            />
        </div>
        <div v-else class="text-primary-gray flex h-30 items-center justify-center text-[14px]">
            {{ $t("common.nothing_found") }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CountryOptionItem } from "@/types";

import CountryOption from "@/components/CountrySearch/CountryOption.vue";

defineProps<{
    countries: CountryOptionItem[];
}>();

const emit = defineEmits<{
    (event: "select", iso2: string): void;
}>();
</script>

<style lang="scss"></style>
