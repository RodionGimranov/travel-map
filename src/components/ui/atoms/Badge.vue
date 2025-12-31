<template>
    <span
        class="rounded-[100px] px-2! py-0.5! text-center text-[14px] font-normal"
        :class="badgeType"
    >
        {{ label }}
    </span>
</template>

<script setup lang="ts">
type BadgeType = "_gray" | "_blue" | "_orange";

withDefaults(
    defineProps<{
        label?: string;
        badgeType?: BadgeType;
    }>(),
    {
        label: "Label",
        badgeType: "_gray",
    },
);
</script>

<style lang="scss">
._gray {
    background: rgb(28, 19, 1, 10.98%);
    color: #494846;
}

._blue {
    background: #dbeafe;
    color: #2563eb;
}

._orange {
    background: #fed7aa;
    color: #c2410c;
}
</style>
