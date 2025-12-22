<template>
    <button
        type="button"
        class="square_button bg-secondary-white hover:bg-secondary-gray flex items-center justify-center rounded-xl"
        :style="buttonStyle"
    >
        <SvgIcon v-if="icon" :name="icon" :width="iconSizeW" :height="iconSizeH" />
        <span v-else-if="label" class="text-primary-dark text-[16px] leading-none font-medium">
            {{ label }}
        </span>
    </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

import SvgIcon from "@/components/ui/atoms/SvgIcon.vue";

interface Props {
    icon?: string;
    label?: string;
    iconSizeW?: number;
    iconSizeH?: number;
    paddingX?: number;
}

const props = withDefaults(defineProps<Props>(), {
    iconSizeW: 24,
    iconSizeH: 24,
    paddingX: 7,
});

const buttonStyle = computed(() => ({
    height: "38px",
    minWidth: "38px",
    paddingLeft: `${props.paddingX}px`,
    paddingRight: `${props.paddingX}px`,
}));
</script>

<style lang="scss">
.square_button {
    flex-shrink: 0;
}
</style>
