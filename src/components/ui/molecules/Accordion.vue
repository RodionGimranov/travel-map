<template>
    <div
        class="border-black-10 flex w-full flex-col items-start justify-start rounded-xl border px-3! py-2!"
    >
        <button type="button" class="flex w-full items-center justify-between" @click="toggle">
            <p class="text-primary-dark text-[16px] font-medium">
                {{ title }}
            </p>
            <SvgIcon name="arrow-icon" :width="18" :height="18" :class="{ 'rotate-90': isOpen }" />
        </button>
        <div v-show="isOpen" class="mt-2!">
            <slot name="content" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import SvgIcon from "@/components/ui/atoms/SvgIcon.vue";

interface Props {
    title: string;
    defaultOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    defaultOpen: false,
});

const isOpen = ref(props.defaultOpen);

function toggle() {
    isOpen.value = !isOpen.value;
}
</script>

<style lang="scss"></style>
