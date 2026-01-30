const TopNav = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <span className="text-xl font-semibold text-gray-900">
            RTTE
          </span>

          <nav className="flex gap-8 text-sm font-medium text-gray-600">
            <span className="text-gray-900 cursor-pointer">
              Dashboard
            </span>
            <span className="hover:text-gray-900 cursor-pointer">
              Documents
            </span>
            <span className="hover:text-gray-900 cursor-pointer">
              Collaborators
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
