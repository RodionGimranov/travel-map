<template>
    <span
        class="rounded-md px-1.5! py-0.5! text-center text-[12px] leading-5! font-medium"
        :class="badgeType"
    >
        {{ label }}
    </span>
</template>

<script setup lang="ts">
type BadgeType = "gray" | "blue" | "amber";

withDefaults(
    defineProps<{
        label?: string;
        badgeType?: BadgeType;
    }>(),
    {
        label: "Label",
        badgeType: "gray",
    },
);
</script>

<style lang="scss">
.gray {
    background: var(--gray-10);
    color: var(--third-gray);
}

.blue {
    background: var(--blue-15);
    color: var(--fourth-blue);
}

.amber {
    background: var(--amber-20);
    color: var(--primary-amber);
}
</style>
