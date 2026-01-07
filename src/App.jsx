// src/App.jsx
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import JobsPage from "./Pages/JobsPage.jsx";
import VolunteerAuth from "./Pages/VolunteerAuth.jsx";
import JobPostForm from "./Pages/JobPostForm.jsx";
import JobDetails from "./Pages/JobDetails.jsx";
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
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={puv} className="w-12 h-12 rounded-md" alt="logo" />
            <div>
              <h1 className="text-xl font-extrabold">
                Pattusali Upadhi Vedhika
              </h1>
              <p className="text-sm text-purple-600">
                Find your dream Opportunity today
              </p>
            </div>
          </div>

          <nav className="hidden md:flex gap-3">
            <NavBtn label="Home" onClick={() => navigate("/")} />
            <NavBtn label="Jobs" onClick={() => navigate("/jobs")} />
            <NavBtn label="Guidance" onClick={() => navigate("/guidance")} />
            <NavBtn label="Training" onClick={() => navigate("/training")} />
            <NavBtn
              label={volunteer ? "Post a Job" : "Volunteer"}
              onClick={() =>
                navigate(volunteer ? "/post-job" : "/volunteer")
              }
            />
          </nav>
        </div>
      </header>

      {/* ROUTES */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage servicetype="job" />} />
          <Route path="/guidance" element={<JobsPage servicetype="guidance" />} />
          <Route path="/training" element={<JobsPage servicetype="training" />} />
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

function NavBtn({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-semibold"
    >
      {label}
    </button>
  );
}
