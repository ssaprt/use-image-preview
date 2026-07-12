//? =============================================== HOW TO USE =============================================== ?//
// import { useImagePreview } from "./useImagePreview";
// const { preview, file, change, clear } = useImagePreview();

// @clear() - clear file and preview
// @change(e) - change file format (e: React.ChangeEvent<HTMLInputElement>) => change(e) or onChange={change}
// @preview - preview of selected file
// @file - selected file and all his attributes or null
//? =============================================== HOW TO USE =============================================== ?//

//? =============== EXAMPLE HOW IT WORKS =============== ?//
// <input type="file" onChange={change} /> or drop
// <button onClick={clear}>Clear file and preview</button>
// <img src={preview} alt="preview" />
//? =============== EXAMPLE HOW IT WORKS =============== ?//

//! ================================== UNMOUNTING ================================== ?//
// useEffect(() => () => clear(), [empty dependencies or dependencies with clear]);
// any action to clear file and preview. Button onClick={clear}.
// If you selected new file, it will be cleared automatically.
//! ================================== UNMOUNTING ================================== ?//

import { useImagePreviewActions } from "./useImagePreview.actions";
import { useImagePreviewStates } from "./useImagePreview.state";
import {
    UseImagePreview,
    UseImagePreviewStates,
} from "./useImagePreview.types";

export const useImagePreview = ({
    onImageSelect,
}: {
    onImageSelect?: (file: File | null) => void;
}): UseImagePreview => {
    const states: UseImagePreviewStates = useImagePreviewStates();
    const { change, clear } = useImagePreviewActions(states, onImageSelect);
    const { preview, file } = states;

    return {
        preview,
        file,
        change,
        clear,
    };
};
