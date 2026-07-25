import { useImagePreviewActions } from "./useImagePreview.actions";
import { useImagePreviewStates } from "./useImagePreview.state";
import type {
    UseImagePreview,
    UseImagePreviewProps,
} from "./useImagePreview.types";

export const useImagePreview = ({
    onImageSelect,
}: UseImagePreviewProps = {}): UseImagePreview => {
    const states = useImagePreviewStates();
    const actions = useImagePreviewActions(states, onImageSelect);

    return {
        preview: states.preview,
        file: states.file,
        change: actions.change,
        clear: actions.clear,
    };
};
