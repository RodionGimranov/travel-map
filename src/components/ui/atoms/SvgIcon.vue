<template>
    <svg
        aria-hidden="true"
        :width="width"
        :height="height"
        class="inline-block overflow-visible fill-current"
    >
        <use :href="`/travel-map/sprite.svg#${name}`" />
    </svg>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        name: string;
        width: number;
        height: number;
    }>(),
    {
        width: 20,
        height: 20,
    },
);
</script>

<style scoped lang="scss"></style>
