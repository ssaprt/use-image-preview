import type { ChangeEvent, Dispatch, DragEvent, SetStateAction } from "react";

export type PreviewFileType = "image" | "video";

export type ImagePreviewChangeSource =
    | ChangeEvent<HTMLInputElement>
    | DragEvent<HTMLElement>
    | File
    | null;

export type UseImagePreviewProps = {
    onImageSelect?: (file: File | null) => void;
};

export type UseImagePreviewActions = {
    change: (source: ImagePreviewChangeSource) => void;
    clear: () => void;
};

export type UseImagePreview = {
    preview: string | null;
    file: File | null;
    type: PreviewFileType | null;
} & UseImagePreviewActions;

export type UseImagePreviewStates = {
    preview: string | null;
    setPreview: Dispatch<SetStateAction<string | null>>;

    file: File | null;
    setFile: Dispatch<SetStateAction<File | null>>;

    type: PreviewFileType | null;
    setType: Dispatch<SetStateAction<PreviewFileType | null>>;

    objectUrlRef: {
        current: string | null;
    };
};
