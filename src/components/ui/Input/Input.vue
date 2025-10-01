<template>
    <div class="input_wrapper" :class="{ _focused: isFocused }">
        <!-- <button class="search_btn"><SvgIcon /></button> -->
        <input
            type="text"
            :placeholder="t('message.input_placeholder')"
            @focus="isFocused = true"
            @blur="isFocused = false"
        />
        <transition name="fade" mode="out-in">
            <p v-if="!isFocused" class="country_request">test</p>
        </transition>
        <!-- <button class="clear_btn"><SvgIcon /></button> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

// import SvgIcon from "@/components/ui/SvgIcon/SvgIcon.vue";

const { t } = useI18n();

const isFocused = ref(false);
</script>

<style lang="scss">
.input_wrapper {
    position: relative;
    width: 500px;
    height: 38px;
    overflow: hidden;
    transition: 0.2s;
    border-radius: 12px;
    background: $secondary_gray;
    border: 1px solid transparent;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;

    &._focused {
        background: $primary_white;
        border-color: $secondary_white;
    }
}

input {
    width: 100%;
    height: 100%;
    cursor: pointer;
    padding-left: 40px;

    font-size: 14px;
    font-weight: 500;
    color: $primary_dark;

    &::placeholder {
        opacity: 0;
        transition: 0.2s;

        color: $fourth_gray;
        font-weight: 400;
    }

    &:focus::placeholder {
        opacity: 1;
    }
}

.country_request {
    position: absolute;
    top: 0;
    left: 40px;
    height: 100%;
    pointer-events: none;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    font-size: 14px;
    font-weight: 500;
    color: $fourth_gray;
}
</style>
