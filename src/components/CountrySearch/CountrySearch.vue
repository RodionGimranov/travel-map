<template>
    <div class="relative flex w-full max-w-117.5 flex-col gap-2">
        <Input
            ref="inputRef"
            v-model="search"
            :placeholder="$t('common.search_placeholder')"
            @focus="onFocus"
            @blur="onBlur"
        />
        <CountrySearchResults
            v-if="isFocused"
            :countries="filteredCountries"
            @select="onSelectCountry"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

import type { CountryOptionItem } from "@/types/country.types";
import { useSideMenuStore } from "@/stores/useSideMenuStore";
import { useEscapeKey } from "@/composables/useEscapeKey";

import Input from "@/components/ui/atoms/Input.vue";
import CountrySearchResults from "@/components/CountrySearch/CountrySearchResults.vue";

import countries from "@/data/countries.data.json";

type CountryLocale = "en" | "ru";

const sideMenuStore = useSideMenuStore();

const { locale } = useI18n();

const search = ref("");
const isFocused = ref(false);
const inputRef = ref<InstanceType<typeof Input> | null>(null);

const currentLocale = computed<CountryLocale>(() => (locale.value === "ru" ? "ru" : "en"));

const onFocus = () => {
    isFocused.value = true;
};

const onBlur = () => {
    isFocused.value = false;
};

const onSelectCountry = (iso2: string) => {
    isFocused.value = false;
    inputRef.value?.blur();
    sideMenuStore.openCountry(iso2);
};

const filteredCountries = computed<CountryOptionItem[]>(() => {
    const query = search.value.trim().toLowerCase();

    const source = !query
        ? countries
        : countries.filter((country) => {
              const ru = country.name.ru.toLowerCase();
              const en = country.name.en.toLowerCase();
              const iso2 = country.iso2.toLowerCase();

              return ru.includes(query) || en.includes(query) || iso2.includes(query);
          });

    return source.map((country) => ({
        iso2: country.iso2,
        label: country.name[currentLocale.value],
    }));
});

useEscapeKey(() => {
    onBlur();
    inputRef.value?.blur();
});
</script>

<style lang="scss"></style>
