import { onMounted, onUnmounted } from "vue";

type EscapeHandler = (event: KeyboardEvent) => void;

export function useEscapeKey(handler: EscapeHandler) {
    const onKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            handler(event);
        }
    };

    onMounted(() => {
        window.addEventListener("keydown", onKeydown);
    });

    onUnmounted(() => {
        window.removeEventListener("keydown", onKeydown);
    });
}
