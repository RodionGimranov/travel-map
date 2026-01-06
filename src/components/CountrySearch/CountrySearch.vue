<template>
    <div class="relative flex w-full max-w-117.5 flex-col gap-2">
        <Input
            ref="inputRef"
            :model-value="countriesStore.search"
            :placeholder="$t('common.search_placeholder')"
            @update:model-value="countriesStore.setSearch"
            @focus="onFocus"
            @blur="onBlur"
        />
        <CountrySearchResults
            v-if="isFocused"
            :countries="countriesStore.filteredCountries"
            @select="onSelectCountry"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

import { useCountriesStore } from "@/stores/useCountriesStore";
import { useSideMenuStore } from "@/stores/useSideMenuStore";
import { useEscapeKey } from "@/composables/useEscapeKey";

import Input from "@/components/ui/atoms/Input.vue";
import CountrySearchResults from "@/components/CountrySearch/CountrySearchResults.vue";

const countriesStore = useCountriesStore();
const sideMenuStore = useSideMenuStore();

const { locale } = useI18n();

const isFocused = ref(false);
const inputRef = ref<InstanceType<typeof Input> | null>(null);

watch(
    () => locale.value,
    (value) => {
        countriesStore.setLocale(value === "ru" ? "ru" : "en");
    },
    { immediate: true },
);

const onFocus = () => {
    isFocused.value = true;
};

const onBlur = () => {
    isFocused.value = false;
};

const onSelectCountry = (iso2: string) => {
    countriesStore.selectCountry(iso2);
    countriesStore.resetSearch();

    sideMenuStore.open("countries");

    inputRef.value?.blur();
};

useEscapeKey(() => {
    onBlur();
    inputRef.value?.blur();
});
</script>

<style lang="scss"></style>
