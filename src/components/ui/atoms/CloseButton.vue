<template>
    <button
        class="hover:bg-secondary-gray flex h-7 min-h-7 w-7 min-w-7 items-center justify-center rounded-lg"
    >
        <SvgIcon name="cross-icon" :width="18" :height="18" />
    </button>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/ui/atoms/SvgIcon.vue";
</script>

<style lang="scss"></style>
