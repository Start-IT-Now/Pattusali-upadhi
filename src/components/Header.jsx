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
        <h1 className="text-sm md:text-base font-bold">Upadhi Vedhika</h1>
        <p className="text-[11px] md:text-sm text-purple-600">
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

    {/* Mobile Menu Button */}
    <button
      className="md:hidden p-2"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <X size={22} /> : <Menu size={22} />}
    </button>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden bg-white border-t">
      {[
        { label: "Home", path: "/" },
        { label: "Jobs", path: "/jobs" },
        { label: "Guidance", path: "/guidance" },
        { label: "Training", path: "/training" },
        {
          label: volunteer ? "Post a Job" : "Volunteer",
          path: volunteer ? "/post-job" : "/volunteer",
        },
      ].map((item) => (
        <button
          key={item.label}
          onClick={() => {
            navigate(item.path);
            setMenuOpen(false);
          }}
          className="block w-full text-left px-5 py-4 text-sm font-medium border-b"
        >
          {item.label}
        </button>
      ))}
    </div>
  )}
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

