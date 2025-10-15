<template>
    <component
        :is="buttonType === 'link' ? 'RouterLink' : 'button'"
        class="primary_btn"
        :class="buttonStyle"
        :to="buttonType === 'link' ? to : undefined"
        :type="buttonType === 'button' ? 'button' : undefined"
        @click="$emit('click')"
    >
        {{ label }}
    </component>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        label?: string;
        buttonStyle?: string;
        buttonType?: "button" | "link";
        to?: string;
    }>(),
    {
        label: "Action",
        buttonStyle: "_gray",
        buttonType: "button",
        to: "",
    },
);

const emit = defineEmits(["click"]);
</script>

<style lang="scss">
.primary_btn {
    overflow: hidden;
    transition: 0.2s;
    border-radius: 12px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 16px;
    font-weight: 400;

    &._gray {
        padding: 8px 16px;
        background: $secondary_gray;
        color: $third_gray;

        &:hover {
            color: $primary_dark;
        }
    }

    &._square {
        width: 38px;
        height: 38px;
        background: $secondary_gray;
        color: $third_gray;

        &:hover {
            color: $primary_dark;
        }
    }
}
</style>
