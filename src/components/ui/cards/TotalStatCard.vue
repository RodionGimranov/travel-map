<template>
    <div class="total_card_stat_container common_card_style">
        <div class="total_card_stat_header">
            <p class="total_card_stat_name">{{ $t(title) }}</p>
            <SvgIcon :name="icon" :width="24" :height="24" />
        </div>
        <div class="total_card_stat_footer">
            <p class="total_card_stat_data_quantity">{{ data }}</p>
            <RouterLink v-if="routerTo" :to="routerTo" class="link_to_detailed_stat">
                {{ $t("message.more_info_btn") }}
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/ui/SvgIcon/SvgIcon.vue";

interface Props {
    title: string;
    icon: string;
    data: number | string;
    routerTo?: string;
}

defineProps<Props>();
</script>

<style lang="scss">
.total_card_stat_container {
    width: 250px;
    height: 156px;
    padding: 16px 16px 26px 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.total_card_stat_header,
.total_card_stat_footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.total_card_stat_name {
    font-size: 18px;
    font-weight: 400;
    color: $third_gray;
}

.total_card_stat_data_quantity {
    font-size: 26px;
    font-weight: 600;
    color: $primary_dark;
}

.link_to_detailed_stat {
    font-size: 16px;
    font-weight: 300;
    color: $primary_blue;

    &:hover {
        text-decoration: underline;
    }
}
</style>
