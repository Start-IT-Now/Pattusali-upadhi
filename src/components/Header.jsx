import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import puv from "../puv.png";

export default function Header({ volunteer }) {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", to: "/" },
    { label: "Jobs", to: "/jobs" },
    { label: "Guidance", to: "/guidance" },
    { label: "Training", to: "/training" },
  ];

  return (
    <header className="bg-white sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={puv} className="w-10 h-10 rounded-md" alt="logo" />
          <div className="leading-tight">
            <span className="font-extrabold text-base sm:text-lg">
              Upadhi Vedhika
            </span>
            <p className="text-xs text-purple-600 hidden sm:block">
              Find your dream Opportunity
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-semibold transition ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

          {/* Volunteer Button */}
          <NavLink
            to={volunteer ? "/post-job" : "/volunteer"}
            className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-semibold hover:opacity-90"
          >
            {volunteer ? "Post a Job" : "Volunteer"}
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          {[...links,
            {
              label: volunteer ? "Post a Job" : "Volunteer",
              to: volunteer ? "/post-job" : "/volunteer",
            },
          ].map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-sm font-medium border-b"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
