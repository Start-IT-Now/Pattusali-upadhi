import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import puv from "../puv.png";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", to: "/" },
    { label: "Jobs", to: "/jobs" },
    { label: "Guidance", to: "/guidance" },
    { label: "Training", to: "/training" },
  ];

  return (
    <header className="bg-white sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={puv} className="w-10 h-10 rounded-md" />
          <span className="font-extrabold text-lg">Upadhi Vedhika</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex gap-4">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold ${
                  isActive ? "bg-purple-600 text-white" : "text-gray-700"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 border-b"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
