export function useEscapeKeyClose(onCloseCallback: () => void) {
    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onCloseCallback();
        }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
        window.removeEventListener("keydown", handleKeydown);
    };
}
