<template>
    <svg class="svg_icon" aria-hidden="true" :width="width" :height="height">
        <use :href="`/travel-map/sprite.svg#${name}`" />
    </svg>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        name: string;
        width?: number;
        height?: number;
    }>(),
    {
        width: 20,
        height: 20,
    },
);
</script>

<style lang="scss">
.svg_icon {
    overflow: visible;
    fill: currentColor;
    display: inline-block;
}
</style>
