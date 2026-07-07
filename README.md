# use-image-preview

React-хук для выбора файла изображения с автоматическим созданием превью (object URL) и корректной очисткой памяти.

## Установка

```bash
npm install use-image-preview
```

```bash
yarn add use-image-preview
```

## Требования

- React >= 18

## Использование

```tsx
import { useImagePreview } from "use-image-preview";

function ImageUploader() {
    const { preview, file, change, clear } = useImagePreview({
        onImageSelect: (file) => {
            console.log("Выбран файл:", file);
        },
    });

    return (
        <div>
            <input type="file" accept="image/*" onChange={change} />

            {preview && (
                <>
                    <img src={preview} alt="preview" width={200} />
                    <button onClick={clear}>Убрать</button>
                </>
            )}
        </div>
    );
}
```

## API

### `useImagePreview(props?)`

#### Параметры

| Параметр        | Тип                            | Обязательный | Описание                                                                     |
| --------------- | ------------------------------ | ------------ | ---------------------------------------------------------------------------- |
| `onImageSelect` | `(file: File \| null) => void` | нет          | Вызывается при выборе нового файла или при очистке (тогда аргумент — `null`) |

#### Возвращаемое значение

| Поле      | Тип                                                          | Описание                                                                                                                                                     |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `preview` | `string \| null`                                             | Object URL для превью выбранного изображения, либо `null`, если файл не выбран                                                                               |
| `file`    | `File \| null`                                               | Выбранный файл со всеми его атрибутами, либо `null`                                                                                                          |
| `change`  | `(e: ChangeEvent<HTMLInputElement> \| File \| null) => void` | Обработчик выбора файла. Можно передать напрямую в `onChange` инпута, вызвать с готовым `File` (например, при drag&drop) или с `null` (эквивалент `clear()`) |
| `clear`   | `() => void`                                                 | Сбрасывает файл и превью, освобождает object URL, вызывает `onImageSelect(null)`                                                                             |

## Работа с drag & drop

`change` принимает не только событие инпута, но и напрямую `File`:

```tsx
const { preview, change, clear } = useImagePreview();

const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) change(droppedFile);
};

return (
    <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        {preview ? (
            <img src={preview} alt="preview" />
        ) : (
            "Перетащите изображение сюда"
        )}
    </div>
);
```

## Управление памятью

Хук самостоятельно освобождает `object URL` через `URL.revokeObjectURL`:

- при выборе нового файла (старый URL освобождается перед созданием нового);
- при вызове `clear()`;
- при размонтировании компонента.

Вручную ничего дополнительно чистить не нужно.

## Особенности

- Хук клиентский (использует `useState`/`useRef`) — при использовании в Next.js App Router компонент, где он вызывается, должен быть помечен `"use client"`.
- Написан на TypeScript, типы поставляются вместе с пакетом.

## Лицензия

MIT
