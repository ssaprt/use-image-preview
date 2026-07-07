"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  useImagePreview: () => useImagePreview
});
module.exports = __toCommonJS(index_exports);

// src/useImagePreview.actions.ts
var import_react = require("react");
var useImagePreviewActions = (props, states) => {
  const { setPreview, setFile, objectUrlRef } = states;
  const { onImageSelect } = props;
  const clear = (0, import_react.useCallback)(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPreview(null);
    setFile(null);
    onImageSelect?.(null);
  }, [onImageSelect, objectUrlRef, setPreview, setFile]);
  const change = (0, import_react.useCallback)(
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
var import_react2 = require("react");
var useImagePreviewStates = () => {
  const [preview, setPreview] = (0, import_react2.useState)(null);
  const [file, setFile] = (0, import_react2.useState)(null);
  const objectUrlRef = (0, import_react2.useRef)(null);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useImagePreview
});
//! ================================== UNMOUNTING ================================== ?//
//# sourceMappingURL=index.js.map