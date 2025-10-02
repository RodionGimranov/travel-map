<template>
    <transition v-if="props.show" name="fade" mode="out-in">
        <p :key="currentIndex" class="country_request">
            {{ currentCountry }}
        </p>
    </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useI18n } from "vue-i18n";

import type { LocalizedCountry } from "@/composables/useLocalizedCountry";
import { getLocalizedCountries } from "@/composables/useLocalizedCountry";

const props = defineProps<{ show: boolean }>();
const { locale } = useI18n();

const currentIndex = ref(0);

const countries = computed<LocalizedCountry[]>(() =>
    getLocalizedCountries(locale.value as "ru" | "en"),
);

const currentCountry = computed(() => countries.value[currentIndex.value]?.name || "");

let intervalId: number;

onMounted(() => {
    intervalId = window.setInterval(() => {
        if (countries.value.length > 1) {
            let newIndex: number;
            do {
                newIndex = Math.floor(Math.random() * countries.value.length);
            } while (newIndex === currentIndex.value);
            currentIndex.value = newIndex;
        }
    }, 2500);
});

onBeforeUnmount(() => {
    clearInterval(intervalId);
});

watch(locale, () => {});
</script>

<style lang="scss">
.country_request {
    position: absolute;
    top: 0;
    left: 40px;
    height: 100%;
    transition: 0.2s;
    pointer-events: none;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    font-size: 14px;
    font-weight: 500;
    color: $fourth_gray;
}
</style>
