import { useRef, useState } from "react";
import { UseImagePreviewStates } from "./useImagePreview.types";

export const useImagePreviewStates = (): UseImagePreviewStates => {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const objectUrlRef = useRef<string | null>(null);

    return {
        preview,
        setPreview,
        file,
        setFile,
        objectUrlRef,
    };
};
