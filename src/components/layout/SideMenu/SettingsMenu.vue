<template>
    <Accordion title="Статусы стран и территорий">
        <template #content>
            <div class="flex w-full flex-col">
                <div
                    v-for="(item, index) in countryStatuses"
                    :key="item.code"
                    class="flex w-full flex-col"
                >
                    <p class="stat_text_style font-medium">{{ item.code }} - {{ item.title }}</p>
                    <p class="stat_text_style font-normal">
                        {{ item.description }}
                    </p>
                    <Divider v-if="index < countryStatuses.length - 1" class="mt-2! mb-2! w-full" />
                </div>
            </div>
        </template>
    </Accordion>
</template>

<script setup lang="ts">
import Accordion from "@/components/ui/molecules/Accordion.vue";
import Divider from "@/components/ui/atoms/Divider.vue";

interface CountryStatusItem {
    code: string;
    title: string;
    description: string;
}

const countryStatuses: CountryStatusItem[] = [
    {
        code: "UN",
        title: "страны, признанные ООН",
        description: "Официальные государства - члены Организации Объединённых Наций.",
    },
    {
        code: "OBS",
        title: "наблюдатели ООН",
        description:
            "Государства или территории со статусом наблюдателя при ООН, без права голоса.",
    },
    {
        code: "DISP",
        title: "спорные территории",
        description: "Территории или государства с оспариваемым международным статусом.",
    },
];
</script>

<style lang="scss">
.stat_text_style {
    font-size: 14px;
    color: var(--color-primary-dark);
}
</style>
