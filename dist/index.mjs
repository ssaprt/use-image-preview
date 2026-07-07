"use client";

// src/useImagePreview.actions.ts
import { useCallback } from "react";
var useImagePreviewActions = (props, states) => {
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
    (e) => {
      let selectedFile = null;
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
    [onImageSelect, clear]
  );
  return { change, clear };
};

// src/useImagePreview.state.ts
import { useRef, useState } from "react";
var useImagePreviewStates = () => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const objectUrlRef = useRef(null);
  return {
    preview,
    setPreview,
    file,
    setFile,
    objectUrlRef
  };
};

// src/useImagePreview.ts
var useImagePreview = ({
  onImageSelect
} = {}) => {
  const states = useImagePreviewStates();
  const { change, clear } = useImagePreviewActions({ onImageSelect }, states);
  const { preview, file } = states;
  return {
    preview,
    file,
    change,
    clear
  };
};
export {
  useImagePreview
};
//! ================================== UNMOUNTING ================================== ?//
//# sourceMappingURL=index.mjs.map