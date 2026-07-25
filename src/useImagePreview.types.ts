import type {
    ChangeEvent,
    Dispatch,
    DragEvent,
    RefObject,
    SetStateAction,
} from "react";

export type ImagePreviewChangeSource =
    | ChangeEvent<HTMLInputElement>
    | DragEvent<HTMLElement>
    | File
    | null;

export type UseImagePreview = {
    preview: string | null;
    file: File | null;
    change: (source: ImagePreviewChangeSource) => void;
    clear: () => void;
};

export type UseImagePreviewStates = {
    preview: string | null;
    setPreview: Dispatch<SetStateAction<string | null>>;
    file: File | null;
    setFile: Dispatch<SetStateAction<File | null>>;
    objectUrlRef: RefObject<string | null>;
};
