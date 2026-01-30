const TopNav = () => {
  return (
    <header className="bg-white/80 backdrop-blur border-b border-indigo-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            RTTE
          </span>

          <nav className="flex gap-8 text-sm font-medium">
            <span className="text-indigo-600 cursor-pointer">
              Dashboard
            </span>
            <span className="text-gray-600 hover:text-indigo-600 cursor-pointer">
              Documents
            </span>
            <span className="text-gray-600 hover:text-indigo-600 cursor-pointer">
              Collaborators
            </span>
          </nav>
        </div>

        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md" />
      </div>
    </header>
  );
};

export default TopNav;
