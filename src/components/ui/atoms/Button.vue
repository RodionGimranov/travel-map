<template>
    <button
        type="button"
        class="custom_button flex h-9.5 min-w-9.5 items-center justify-center gap-1"
        :class="variantClass"
        :style="buttonStyle"
    >
        <slot />
        <span v-if="label" class="custom_btn_text">
            {{ $t(label) }}
        </span>
    </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

type ButtonVariant = "gray" | "blue" | "outline";
type PaddingVariant = "compact" | "medium" | "large";
type ShapeVariant = "regular" | "pill";

interface Props {
    label?: string;
    variant?: ButtonVariant;
    paddingVariant?: PaddingVariant;
    shape?: ShapeVariant;
}

const props = withDefaults(defineProps<Props>(), {
    variant: "gray",
    paddingVariant: "compact",
    shape: "regular",
});

const PADDING_MAP: Record<PaddingVariant, number> = {
    compact: 7,
    medium: 12,
    large: 16,
};

const RADIUS_MAP: Record<ShapeVariant, number> = {
    regular: 12,
    pill: 100,
};

const variantClass = computed(() => {
    return `custom_button--${props.variant}`;
});

const buttonStyle = computed(() => {
    const paddingX = PADDING_MAP[props.paddingVariant];
    const radius = RADIUS_MAP[props.shape];

    return {
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`,
        borderRadius: `${radius}px`,
    };
});
</script>

<style lang="scss">
.custom_button {
    border: 1px solid transparent;
    flex-shrink: 0;

    span,
    .custom_btn_text {
        font-size: 16px;
        font-weight: 400;
    }
}

.custom_button--gray {
    background: var(--secondary-white);
    color: var(--primary-dark);

    &:hover {
        background: var(--secondary-gray);
    }
}

.custom_button--blue {
    background: var(--secondary-blue);
    color: var(--primary-white);

    &:hover {
        background: var(--third-blue);
    }
}

.custom_button--outline {
    border-color: var(--secondary-gray);
    color: var(--primary-dark);

    &:hover {
        background: var(--secondary-gray);
    }
}
</style>
