<template>
    <span
        class="text-primary-gray bg-secondary-white flex h-5 min-w-5 items-center justify-center overflow-hidden rounded-md px-1! text-[14px] font-medium"
    >
        {{ label }}
    </span>
</template>

<script setup lang="ts">
interface Props {
    label: string;
}

const props = withDefaults(defineProps<Props>(), {
    label: "K",
});
</script>

<style lang="scss"></style>
