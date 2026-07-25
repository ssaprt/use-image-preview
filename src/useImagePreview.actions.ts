import { useCallback } from "react";
import type {
    ImagePreviewChangeSource,
    UseImagePreviewStates,
} from "./useImagePreview.types";

export const useImagePreviewActions = (
    states: UseImagePreviewStates,
    onImageSelect?: (file: File | null) => void,
) => {
    const { setPreview, setFile, objectUrlRef } = states;

    const clear = useCallback(() => {
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
        }

        setPreview(null);
        setFile(null);
        onImageSelect?.(null);
    }, [objectUrlRef, onImageSelect, setFile, setPreview]);

    const change = useCallback(
        (source: ImagePreviewChangeSource) => {
            let selectedFile: File | null = null;

            if (source === null) {
                clear();
                return;
            }

            if (typeof File !== "undefined" && source instanceof File) {
                selectedFile = source;
            } else if ("dataTransfer" in source) {
                source.preventDefault();

                if (source.type !== "drop") {
                    return;
                }

                selectedFile = source.dataTransfer.files.item(0);
            } else {
                selectedFile = source.currentTarget.files?.item(0) ?? null;
            }

            if (!selectedFile) {
                return;
            }

            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }

            const objectUrl = URL.createObjectURL(selectedFile);
            objectUrlRef.current = objectUrl;
            setPreview(objectUrl);
            setFile(selectedFile);
            onImageSelect?.(selectedFile);
        },
        [clear, objectUrlRef, onImageSelect, setFile, setPreview],
    );

    return {
        change,
        clear,
    };
};
