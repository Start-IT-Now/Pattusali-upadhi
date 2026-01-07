import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import puv from "../puv.png";

export default function Header({ volunteer }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={puv} className="w-9 h-9 rounded-md" />
          <div>
            <h1 className="text-sm font-bold">Upadhi Vedhika</h1>
            <p className="text-xs text-purple-600">
              Find your dream Opportunity
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-3">
          <NavButton label="Home" onClick={() => navigate("/")} />
          <NavButton label="Jobs" onClick={() => navigate("/jobs")} />
          <NavButton label="Guidance" onClick={() => navigate("/guidance")} />
          <NavButton label="Training" onClick={() => navigate("/training")} />
          <NavButton
            label={volunteer ? "Post a Job" : "Volunteer"}
            onClick={() =>
              navigate(volunteer ? "/post-job" : "/volunteer")
            }
          />
        </nav>

        {/* Mobile Menu */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function NavButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full bg-[#6C46CF] text-white text-sm font-semibold"
    >
      {label}
    </button>
  );
}

