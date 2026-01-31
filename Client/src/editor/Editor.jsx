
import { EditorContent } from "@tiptap/react";

export default function Editor({ editor }) {
  if (!editor) return null;

  return (
    <div className="w-full min-h-[600px] p-6">
      <EditorContent
        editor={editor}
        className="prose max-w-none focus:outline-none"
      />
    </div>
  );
}
