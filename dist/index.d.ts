import { RefObject } from 'react';

type UseImagePreviewProps = {
    onImageSelect?: (file: File | null) => void;
};
type UseImagePreviewStates = {
    preview: string | null;
    setPreview: React.Dispatch<React.SetStateAction<string | null>>;
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    objectUrlRef: RefObject<string | null>;
};
type UseImagePreviewActions = {
    change: (e: React.ChangeEvent<HTMLInputElement> | File | null) => void;
    clear: () => void;
};
type UseImagePreview = Pick<UseImagePreviewStates, "preview" | "file"> & UseImagePreviewActions;

declare const useImagePreview: ({ onImageSelect, }?: UseImagePreviewProps) => UseImagePreview;

export { type UseImagePreview, type UseImagePreviewActions, type UseImagePreviewProps, useImagePreview };
