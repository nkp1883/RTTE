import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const TopNav = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const linkClass = ({ isActive }) =>
    `cursor-pointer ${
      isActive
        ? "text-indigo-600"
        : "text-gray-600 hover:text-indigo-600"
    }`;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur border-b border-indigo-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left */}
        <span
          onClick={() => navigate("/dashboard")}
          className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
        >
          RTTE
        </span>

        {/* Center nav */}
        <nav className="flex gap-8 text-sm font-medium">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/documents" className={linkClass}>
            Documents
          </NavLink>
          <NavLink to="/collaborators" className={linkClass}>
            Collaborators
          </NavLink>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-5 relative">
          {/* Notification icon */}
          <button
            onClick={() => navigate("/notifications")}
            className="relative text-gray-600 hover:text-indigo-600 transition"
            title="Notifications"
          >
            🔔
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
          </button>

          {/* Profile */}
          <div ref={dropdownRef} className="relative">
            <div
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md cursor-pointer"
            />

            {open && (
              <div className="absolute right-0 mt-3 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    setOpen(false);
                    alert("Logout clicked (hook auth later)");
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
