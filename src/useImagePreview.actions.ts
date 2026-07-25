import { useCallback, type ChangeEvent, type DragEvent } from "react";

import type {
    ImagePreviewChangeSource,
    UseImagePreviewActions,
    UseImagePreviewStates,
} from "./useImagePreview.types";

const isFile = (source: ImagePreviewChangeSource): source is File => {
    return typeof File !== "undefined" && source instanceof File;
};

const isDragEvent = (
    source: ImagePreviewChangeSource,
): source is DragEvent<HTMLElement> => {
    return (
        source !== null &&
        typeof source === "object" &&
        "dataTransfer" in source
    );
};

const isInputChangeEvent = (
    source: ImagePreviewChangeSource,
): source is ChangeEvent<HTMLInputElement> => {
    return (
        source !== null &&
        typeof source === "object" &&
        "currentTarget" in source &&
        source.currentTarget instanceof HTMLInputElement
    );
};

export const useImagePreviewActions = (
    states: UseImagePreviewStates,
    onImageSelect?: (file: File | null) => void,
): UseImagePreviewActions => {
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

            if (isFile(source)) {
                selectedFile = source;
            } else if (isDragEvent(source)) {
                source.preventDefault();

                if (source.type !== "drop") {
                    return;
                }

                selectedFile = source.dataTransfer.files.item(0);
            } else if (isInputChangeEvent(source)) {
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
