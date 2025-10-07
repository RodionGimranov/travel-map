<template>
    <label class="custom-checkbox" :style="{ width: checkboxWidth, height: checkboxHeight }">
        <input id="checkbox-input" type="checkbox" />
        <span class="checkbox_box">
            <span class="checkmark"></span>
            <span class="remove">
                <SvgIcon name="remove-icon" width="12" height="2" />
            </span>
        </span>
    </label>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/ui/SvgIcon/SvgIcon.vue";

const { checkboxWidth, checkboxHeight } = withDefaults(
    defineProps<{
        checkboxWidth?: string;
        checkboxHeight?: string;
    }>(),
    {
        checkboxWidth: "26px",
        checkboxHeight: "26px",
    },
);
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
    border-radius: 100px;
    background: $primary_white;
    border: 2px solid $fourth_white;

    display: flex;
    justify-content: center;
    align-items: center;
}

.checkmark {
    display: none;
    width: 100%;
    height: 100%;
    border-radius: 100px;
}

input:checked + .checkbox_box .checkmark {
    display: block;
    border-radius: 100px;
    background: $fourth_white;
    border: 1px solid $primary_white;
}

.remove {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
}

input:checked + .checkbox_box:hover .remove {
    display: flex;
}
</style>
