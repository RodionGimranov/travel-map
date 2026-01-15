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
    background: rgb(82, 82, 92, 10%);
    color: #3f3f46;
}

.blue {
    background: rgb(43, 127, 255, 15%);
    color: #1447e6;
}

.amber {
    background: rgb(255, 185, 0, 20%);
    color: #bb4d00;
}
</style>
