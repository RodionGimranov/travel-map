<template>
    <svg class="svg_icon" aria-hidden="true" :width="width" :height="height">
        <use :href="`/travel-map/sprite.svg#${name}`" />
    </svg>
</template>

<script setup lang="ts">
const props = defineProps({
    name: { type: String, required: true },
    width: { type: [String, Number], default: 20 },
    height: { type: [String, Number], default: 20 },
});
</script>

<style lang="scss">
.svg_icon {
    overflow: visible;
    fill: currentColor;
    display: inline-block;
}
</style>
