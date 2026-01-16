<template>
    <svg
        class="dotted-bg"
        width="100%"
        height="100%"
        viewBox="0 0 2400 1600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
    >
        <circle
            v-for="(dot, i) in dots"
            :key="i"
            :cx="dot.x"
            :cy="dot.y"
            :r="radius"
            fill="currentColor"
        />
    </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const VIEWBOX_WIDTH = 2400;
const VIEWBOX_HEIGHT = 1600;

const gap = 22;
const radius = 2;

const dots = computed(() => {
    const result: Array<{ x: number; y: number }> = [];

    for (let y = 0; y <= VIEWBOX_HEIGHT; y += gap) {
        for (let x = 0; x <= VIEWBOX_WIDTH; x += gap) {
            result.push({ x, y });
        }
    }

    return result;
});
</script>

<style scoped lang="scss">
.dotted-bg {
    position: absolute;
    inset: 0;
    z-index: -100;
    pointer-events: none;
    color: var(--gray-30);
}
</style>
