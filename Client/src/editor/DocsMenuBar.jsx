export default function DocsMenuBar() {
  const items = [
    "File",
    "Edit",
    "View",
    "Insert",
    "Format",
    "Tools",
    "Extensions",
    "Help",
  ];

  return (
    <div className="h-9 bg-white flex items-center px-4 gap-4 text-sm text-slate-700 border-b border-slate-200">
      {items.map((item) => (
        <span
          key={item}
          className="cursor-pointer hover:bg-slate-100 px-2 py-1 rounded"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
