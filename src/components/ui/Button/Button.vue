<template>
    <button class="primary_btn" @click="props.action">{{ props.label }}</button>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";

const props = withDefaults(
    defineProps<{
        label: string;
        action?: () => void;
    }>(),
    {
        action: () => console.log("Click"),
    },
);
</script>

<style lang="scss">
.primary_btn {
    width: 38px;
    height: 38px;
    transition: 0.2s;
    border-radius: 12px;
    background: $secondary_gray;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    font-weight: 500;
    color: $third_gray;
}
</style>
