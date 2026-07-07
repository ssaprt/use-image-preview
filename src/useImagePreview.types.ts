import { RefObject } from "react";

export type UseImagePreviewProps = {
    onImageSelect?: (file: File | null) => void;
};

export type UseImagePreviewStates = {
    preview: string | null;
    setPreview: React.Dispatch<React.SetStateAction<string | null>>;
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    objectUrlRef: RefObject<string | null>;
};

export type UseImagePreviewActions = {
    change: (e: React.ChangeEvent<HTMLInputElement> | File | null) => void;
    clear: () => void;
};

export type UseImagePreview = Pick<UseImagePreviewStates, "preview" | "file"> &
    UseImagePreviewActions;
