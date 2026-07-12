import { useCallback } from "react";
import {
    UseImagePreviewProps,
    UseImagePreviewStates,
} from "./useImagePreview.types";

export const useImagePreviewActions = (
    props: UseImagePreviewProps,
    states: UseImagePreviewStates,
) => {
    const { setPreview, setFile, objectUrlRef } = states;
    const { onImageSelect } = props;

    const clear = useCallback(() => {
        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
            objectUrlRef.current = null;
        }
        setPreview(null);
        setFile(null);
        onImageSelect?.(null);
    }, [onImageSelect, objectUrlRef, setPreview, setFile]);

    const change = useCallback(
        (e: React.ChangeEvent<HTMLInputElement> | File | null) => {
            let selectedFile: File | null = null;

            if (e instanceof File) {
                selectedFile = e;
            } else if (e === null) {
                clear();
                return;
            } else {
                selectedFile = e.target.files?.[0] || null;
            }

            if (!selectedFile) return;

            if (objectUrlRef.current) {
                URL.revokeObjectURL(objectUrlRef.current);
            }

            const objectUrl = URL.createObjectURL(selectedFile);
            objectUrlRef.current = objectUrl;

            setPreview(objectUrl);
            setFile(selectedFile);
            onImageSelect?.(selectedFile);
        },
        [onImageSelect, clear],
    );

    return { change, clear };
};
