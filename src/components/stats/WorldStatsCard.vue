<template>
    <div
        class="border-black-10 flex h-39 w-62.5 flex-col items-start justify-between overflow-hidden rounded-[22px] border px-4! pt-4! pb-5.5!"
    >
        <div class="flex w-full items-end justify-between">
            <p class="text-primary-gray text-[18px] font-normal">
                {{ $t(title) }}
            </p>
            <SvgIcon :name="icon" :width="24" :height="24" />
        </div>
        <div class="flex w-full items-end justify-between">
            <p class="text-primary-dark text-[26px] font-semibold">0</p>
            <RouterLink
                v-if="hasLink && linkTo"
                :to="linkTo"
                class="text-primary-blue text-[16px] font-normal hover:underline!"
            >
                {{ $t("common.read_more") }}
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/ui/atoms/SvgIcon.vue";

defineProps<{
    title: string;
    icon: string;
    hasLink: boolean;
    linkTo?: string;
}>();
</script>

<style lang="scss"></style>
