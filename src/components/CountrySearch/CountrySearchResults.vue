<template>
    <div
        class="border-black-10 bg-white-90 absolute top-11.5 flex max-h-90 min-h-30 w-full flex-col overflow-hidden rounded-xl border backdrop-blur-[2px]"
    >
        <div v-if="countries.length" class="w-full overflow-auto p-2!">
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
import type { CountryOptionItem } from "@/types/country.types";

import CountryOption from "@/components/CountrySearch/CountryOption.vue";

defineProps<{
    countries: CountryOptionItem[];
}>();

const emit = defineEmits<{
    (event: "select", iso2: string): void;
}>();
</script>

<style lang="scss"></style>
