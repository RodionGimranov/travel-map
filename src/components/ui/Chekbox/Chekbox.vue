<template>
    <label class="custom-checkbox" :style="{ width: checkboxWidth, height: checkboxHeight }">
        <input id="checkbox-input" type="checkbox" />
        <span class="checkbox_box">
            <SvgIcon class="checkmark" name="checkmark-icon" width="16" height="16" />
        </span>
    </label>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/ui/SvgIcon/SvgIcon.vue";

const { checkboxWidth = "26px", checkboxHeight = "26px" } = defineProps<{
    checkboxWidth?: string;
    checkboxHeight?: string;
}>();
</script>

<style lang="scss">
input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

.custom-checkbox {
    position: relative;
    cursor: pointer;
}

.checkbox_box {
    width: 100%;
    height: 100%;
    transition: 0.2s;
    border-radius: 100px;
    background: $primary_white;
    border: 2px solid $third_blue;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        transform: scale(1.05);
    }

    &:active {
        transform: scale(1);
    }

    .checkmark {
        opacity: 0;
    }
}

input:checked + .checkbox_box {
    background: $secondary_blue;
    border: 2px solid $secondary_blue;

    .checkmark {
        opacity: 1;
    }
}
</style>
