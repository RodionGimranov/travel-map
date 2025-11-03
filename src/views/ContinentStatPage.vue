<template>
    <section class="continent_stat_page_wrapper common_page_wrapper">
        <div class="stat_page_header">
            <p class="stat_page_title">{{ $t("message.continent_stat_title") }}</p>
        </div>
        <div class="continent_card_stat_list"><ContinentStatCard /></div>
    </section>
</template>

<script setup lang="ts">
import ContinentStatCard from "@/components/ui/cards/ContinentStatCard.vue";
</script>

<style lang="scss">
.continent_card_stat_list {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 25px;
}
</style>
