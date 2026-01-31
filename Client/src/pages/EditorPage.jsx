import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import { createYjsProvider } from "../collaboration/wsProvider";

export default function EditorPage() {
  const providerRef = useRef(null);
  if (!providerRef.current) {
    providerRef.current = createYjsProvider();
  }

  const { ydoc } = providerRef.current;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Collaboration.configure({
        document: ydoc,
        field: "content",
      }),
    ],
  });

  if (!editor) return <div>Loading editor…</div>;

  return (
    <div style={{ padding: 20 }}>
      <EditorContent editor={editor} />
    </div>
  );
}
