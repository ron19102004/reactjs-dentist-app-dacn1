import React, { useEffect } from "react";
import "quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";

interface TextCkEditorProps {
  changeValue(html: string): void;
  changeText?(text: string): void;
}

const TextCkEditor: React.FC<TextCkEditorProps> = ({
  changeValue,
  changeText,
}) => {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        ["clean"],
      ],
    },
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        const text = quill.getText().trim();
        changeValue(html);
        if (changeText) changeText(text);
      });
    }
  }, [quill]);

  return (
    <div className="rounded-lg overflow-hidden border border-gray-300 shadow-sm">
      <div
        ref={quillRef}
        className="min-h-[280px] max-h-[500px] overflow-y-auto text-base bg-white px-4 py-3 leading-relaxed"
        style={{
          fontFamily: "inherit",
        }}
      />
    </div>
  );
};

export default TextCkEditor;
