import { onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";

interface UseFocusHotkeyOptions {
    key?: string;
    enabled?: Ref<boolean>;
}

export function useFocusHotkey(
    inputRef: Ref<HTMLInputElement | null>,
    options: UseFocusHotkeyOptions = {},
) {
    const { key = "/", enabled } = options;

    const handler = (event: KeyboardEvent) => {
        if (event.key !== key) return;
        if (enabled && !enabled.value) return;

        const target = event.target as HTMLElement | null;

        if (
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement ||
            target?.isContentEditable
        ) {
            return;
        }

        event.preventDefault();
        inputRef.value?.focus();
    };

    onMounted(() => {
        window.addEventListener("keydown", handler);
    });

    onUnmounted(() => {
        window.removeEventListener("keydown", handler);
    });
}
