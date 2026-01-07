// src/App.jsx
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import HomePage from "./Pages/HomePage.jsx";
import JobsPage from "./Pages/JobsPage.jsx";
import VolunteerAuth from "./Pages/VolunteerAuth.jsx";
import JobPostForm from "./Pages/JobPostForm.jsx";
import JobDetails from "./Pages/JobDetails.jsx";
import JobCard from "./Pages/JobCard.jsx";

import Footer from "./components/Footer.jsx";
import puv from "./puv.png";

export default function App() {
  const navigate = useNavigate();
  const [volunteer, setVolunteer] = useState(null);

  const handleAuthSuccess = (userData) => {
    setVolunteer(userData);
    navigate("/post-job");
  };

  return (
    <div className="min-h-screen bg-[#F7F3FF] flex flex-col">
      {/* HEADER */}
      <header className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={puv}
              alt="logo"
              className="w-12 h-12 rounded-md object-cover"
            />
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                Pattusali Upadhi Vedhika
              </h1>
              <p className="text-sm text-[#6C46CF]">
                Find your dream Opportunity today
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
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
        </div>
      </header>

      {/* ROUTES */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/jobs"
            element={<JobsPage servicetype="job" />}
          />
          <Route
            path="/guidance"
            element={<JobsPage servicetype="guidance" />}
          />
          <Route
            path="/training"
            element={<JobsPage servicetype="training" />}
          />

          <Route
            path="/volunteer"
            element={
              <VolunteerAuth
                onSuccess={handleAuthSuccess}
                onCancel={() => navigate("/")}
              />
            }
          />

          <Route path="/post-job" element={<JobPostForm />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

/* ---------- NAV BUTTON ---------- */
function NavButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full bg-[#6C46CF] text-white text-sm font-semibold hover:opacity-90 transition"
    >
      {label}
    </button>
  );
}
