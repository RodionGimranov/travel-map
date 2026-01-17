<template>
    <span
        ref="triggerRef"
        class="relative inline-flex"
        @mouseenter="onEnter"
        @mouseleave="onLeave"
        @focusin="onEnter"
        @focusout="onLeave"
    >
        <slot />
    </span>
    <Teleport to="body">
        <span
            v-if="isOpen"
            class="bg-secondary-dark text-primary-white pointer-events-none fixed z-50 rounded-lg px-1.5! py-0.5! text-center text-[12px] leading-5 font-normal whitespace-nowrap"
            :style="tooltipStyle"
        >
            {{ $t(tooltipText) }}
        </span>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";

type Placement = "top" | "right" | "bottom" | "left";

const props = withDefaults(
    defineProps<{
        tooltipText?: string;
        placement?: Placement;
        offset?: number;
        openDelay?: number;
        closeDelay?: number;
    }>(),
    {
        tooltipText: "Label",
        placement: "top",
        offset: 4,
        openDelay: 100,
        closeDelay: 75,
    },
);

const triggerRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);

let openTimer: number | null = null;
let closeTimer: number | null = null;

const clearTimers = () => {
    if (openTimer) {
        clearTimeout(openTimer);
        openTimer = null;
    }
    if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
    }
};

const onEnter = () => {
    clearTimers();
    openTimer = window.setTimeout(() => {
        isOpen.value = true;
    }, props.openDelay);
};

const onLeave = () => {
    clearTimers();
    closeTimer = window.setTimeout(() => {
        isOpen.value = false;
    }, props.closeDelay);
};

onBeforeUnmount(clearTimers);

const tooltipStyle = computed(() => {
    if (!triggerRef.value) return {};

    const rect = triggerRef.value.getBoundingClientRect();

    switch (props.placement) {
        case "right":
            return {
                top: `${rect.top + rect.height / 2}px`,
                left: `${rect.right + props.offset}px`,
                transform: "translateY(-50%)",
            };
        case "left":
            return {
                top: `${rect.top + rect.height / 2}px`,
                left: `${rect.left - props.offset}px`,
                transform: "translate(-100%, -50%)",
            };
        case "bottom":
            return {
                top: `${rect.bottom + props.offset}px`,
                left: `${rect.left + rect.width / 2}px`,
                transform: "translateX(-50%)",
            };
        case "top":
        default:
            return {
                top: `${rect.top - props.offset}px`,
                left: `${rect.left + rect.width / 2}px`,
                transform: "translate(-50%, -100%)",
            };
    }
});
</script>

<style lang="css"></style>
