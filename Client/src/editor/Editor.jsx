
import { useRef } from "react";
import { useEditorSync } from "./useEditorSync";

export default function Editor() {
  const textareaRef = useRef(null);
  useEditorSync(textareaRef);

  return (
    <textarea
      ref={textareaRef}
      placeholder="Start typing..."
      style={{
        width: "100vw",
        height: "100vh",
        fontSize: "16px",
        padding: "12px",
        boxSizing: "border-box",
      }}
    />
  );
}

