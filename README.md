# use-image-preview

A React hook for selecting an image file, automatically creating a preview using an object URL, and properly cleaning it up to prevent memory leaks.

## Installation

```bash
npm install use-image-preview
```

```bash
yarn add use-image-preview
```

## Requirements

* React >= 18

## Usage

```tsx
import { useImagePreview } from "use-image-preview";

function ImageUploader() {
    const { preview, file, change, clear, type } = useImagePreview({
        onImageSelect: (file) => {
            console.log("Selected file:", file);
            console.log("Selected file type", type)
        },
    });

    return (
        <div>
            <input type="file" accept="image/*" onChange={change} />

            {preview && (
                <>
                    <img src={preview} alt="Preview" width={200} />
                    <button onClick={clear}>Remove</button>
                </>
            )}
        </div>
    );
}
```

## API

### `useImagePreview(props?)`

#### Parameters

| Parameter       | Type                           | Required | Description                                                                                                   |
| --------------- | ------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------- |
| `onImageSelect` | `(file: File \| null) => void` | No       | Called when a new file is selected or when the current file is cleared. In that case, the argument is `null`. |

#### Return value

| Property  | Type                                                         | Description                                                                                                                                                                                                     |
| --------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `preview` | `string \| null`                                             | The object URL of the selected image preview, or `null` when no file is selected.                                                                                                                               |
| `file`    | `File \| null`                                               | The selected file with all its properties, or `null`.                                                                                                                                                           |
| `change`  | `(e: ChangeEvent<HTMLInputElement> \| File \| null) => void` | Handles file selection. It can be passed directly to an input's `onChange`, called with a `File` object, for example when using drag and drop, or called with `null`, which is equivalent to calling `clear()`. |
| `clear`   | `() => void`                                                 | Clears the selected file and preview, revokes the object URL, and calls `onImageSelect(null)`.                                                                                                                  |
| `type` | `video \| image` | No       | Return type select media`. |

## Drag and drop

The `change` function accepts not only an input change event, but also a `File` object directly:

```tsx
const { preview, change, clear } = useImagePreview();



return (
    <div onDrop={change} onDragOver={change}>
        {preview ? 
            type === "video" ? <video src={preview}> 
            : <img src={preview} alt="Preview" /> 
        : (
            "Drag an image here"
        )}
    </div>
);
```

## Memory management

The hook automatically revokes object URLs using `URL.revokeObjectURL`:

* when a new file is selected, the previous URL is revoked before a new one is created;
* when `clear()` is called;
* when the component is unmounted.

No additional manual cleanup is required.

## Notes

* This is a client-side hook because it uses `useState` and `useRef`. When using it with the Next.js App Router, the component that calls the hook must include the `"use client"` directive.
* The package is written in TypeScript, and type definitions are included.

## License

MIT
