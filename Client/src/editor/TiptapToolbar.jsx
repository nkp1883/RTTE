import { useState } from "react";

export default function TiptapToolbar({ editor }) {
  const [open, setOpen] = useState(false);
  if (!editor) return null;

  const blockLabel = editor.isActive("heading", { level: 1 })
    ? "Heading 1"
    : editor.isActive("heading", { level: 2 })
    ? "Heading 2"
    : editor.isActive("heading", { level: 3 })
    ? "Heading 3"
    : editor.isActive("heading", { level: 4 })
    ? "Heading 4"
    : "Normal text";

  return (
    <div className="relative h-12 bg-white border-b border-slate-200 flex items-center px-3 gap-1 text-sm">
      {/* Undo / Redo */}
      <Icon onClick={() => editor.chain().focus().undo().run()}>↶</Icon>
      <Icon onClick={() => editor.chain().focus().redo().run()}>↷</Icon>

      <Divider />

      {/* Heading Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="h-8 px-3 rounded hover:bg-slate-100 flex items-center gap-1 text-slate-700"
        >
          {blockLabel} ▾
        </button>

        {open && (
          <div className="absolute top-9 left-0 w-44 bg-white border border-slate-200 shadow rounded z-50">
            <MenuItem
              onClick={() => {
                editor.chain().focus().setParagraph().run();
                setOpen(false);
              }}
            >
              Normal text
            </MenuItem>

            {[1, 2, 3, 4].map((level) => (
              <MenuItem
                key={level}
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level }).run();
                  setOpen(false);
                }}
              >
                Heading {level}
              </MenuItem>
            ))}
          </div>
        )}
      </div>

      <Divider />

      {/* Inline Formatting */}
      <Icon
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </Icon>

      <Icon
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        I
      </Icon>

      <Icon
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        U
      </Icon>
    </div>
  );
}

function Icon({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`
        h-8 w-8
        flex items-center justify-center
        rounded
        text-slate-700
        hover:bg-slate-100
        ${active ? "bg-indigo-100 text-indigo-700" : ""}
      `}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="h-6 w-px bg-slate-300 mx-1" />;
}

function MenuItem({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="px-3 py-2 hover:bg-slate-100 cursor-pointer text-slate-700"
    >
      {children}
    </div>
  );
}
