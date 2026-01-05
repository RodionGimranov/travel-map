<template>
    <Accordion title="sideMenu.accordion_country_status">
        <template #content>
            <div class="flex w-full flex-col">
                <div
                    v-for="(item, index) in countryStatuses"
                    :key="item.code"
                    class="flex w-full flex-col"
                >
                    <p class="stat_text_style font-medium">
                        {{ item.code }} - {{ $t(item.title) }}
                    </p>
                    <p class="stat_text_style font-normal">
                        {{ $t(item.description) }}
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
        title: "sideMenu.country_status_un_title",
        description: "sideMenu.country_status_un_description",
    },
    {
        code: "OBS",
        title: "sideMenu.country_status_obs_title",
        description: "sideMenu.country_status_obs_description",
    },
    {
        code: "DISP",
        title: "sideMenu.country_status_disp_title",
        description: "sideMenu.country_status_disp_description",
    },
];
</script>

<style lang="scss">
.stat_text_style {
    font-size: 14px;
    color: var(--color-primary-dark);
}
</style>
