import { useCallback, type ChangeEvent, type DragEvent } from "react";
import type {
    ImagePreviewChangeSource,
    PreviewFileType,
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
        typeof HTMLInputElement !== "undefined" &&
        source.currentTarget instanceof HTMLInputElement
    );
};

const getFileType = (file: File): PreviewFileType | null => {
    if (file.type.startsWith("image/")) {
        return "image";
    }

    if (file.type.startsWith("video/")) {
        return "video";
    }

    return null;
};

export const useImagePreviewActions = (
    states: UseImagePreviewStates,
    onImageSelect?: (file: File | null) => void,
): UseImagePreviewActions => {
    const { setPreview, setFile, setType, objectUrlRef } = states;

    const clear = useCallback(() => {
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
        }

        setPreview(null);
        setFile(null);
        setType(null);

        onImageSelect?.(null);
    }, [objectUrlRef, onImageSelect, setFile, setPreview, setType]);

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

            const selectedFileType = getFileType(selectedFile);

            if (!selectedFileType) {
                return;
            }

            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }

            const objectUrl = URL.createObjectURL(selectedFile);

            objectUrlRef.current = objectUrl;

            setPreview(objectUrl);
            setFile(selectedFile);
            setType(selectedFileType);

            onImageSelect?.(selectedFile);
        },
        [clear, objectUrlRef, onImageSelect, setFile, setPreview, setType],
    );

    return {
        change,
        clear,
    };
};
