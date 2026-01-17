<template>
    <div
        class="bg-third-white hover:bg-fourth-white flex max-h-11 min-h-11 w-full cursor-pointer items-center justify-between rounded-xl px-4! py-2.5!"
        @click="emit('select', iso2)"
    >
        <p class="text-primary-dark text-[16px] font-normal">
            {{ name }}
        </p>
        <div class="flex items-center justify-center gap-2">
            <Badge
                v-if="countryBadge"
                :label="countryBadge.label"
                :badge-type="countryBadge.badgeType"
            />
            <Tooltip tooltipText="common.delete_title" placement="top">
                <DeleteButton @click="emit('remove', iso2)" />
            </Tooltip>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CountryStatus } from "@/types";
import { useCountryBadge } from "@/composables/useCountryBadge";

import Badge from "@/components/ui/atoms/Badge.vue";
import DeleteButton from "@/components/ui/atoms/DeleteButton.vue";
import Tooltip from "@/components/ui/atoms/Tooltip.vue";

const props = defineProps<{
    iso2: string;
    name: string;
    status: CountryStatus;
}>();

const emit = defineEmits<{
    (event: "select", iso2: string): void;
    (event: "remove", iso2: string): void;
}>();

const { countryBadge } = useCountryBadge(() => ({
    status: props.status,
}));
</script>

<style lang="scss"></style>
