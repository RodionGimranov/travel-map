<template>
    <div
        @mousedown.prevent="emit('select', item.iso2)"
        class="hover:bg-third-white flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3! py-2!"
    >
        <p class="text-primary-dark text-[16px] font-normal">
            {{ item.label }}
        </p>
        <SvgIcon
            v-if="travelStatsStore.isVisited(props.item.iso2)"
            name="check-icon"
            :width="18"
            :height="18"
        />
    </div>
</template>

<script setup lang="ts">
import type { CountryOptionItem } from "@/types";
import { useTravelStatsStore } from "@/stores/useTravelStatsStore";

import SvgIcon from "@/components/ui/atoms/SvgIcon.vue";

const props = defineProps<{
    item: CountryOptionItem;
}>();

const emit = defineEmits<{
    (event: "select", iso2: string): void;
}>();

const travelStatsStore = useTravelStatsStore();
</script>

<style lang="scss"></style>
