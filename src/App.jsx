// src/App.jsx
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import JobsPage from "./Pages/JobsPage.jsx";
import VolunteerAuth from "./Pages/VolunteerAuth.jsx";
import JobPostForm from "./Pages/JobPostForm.jsx";
import JobDetails from "./Pages/JobDetails.jsx";
import AdminJobs from "./Pages/AdminJobs.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const navigate = useNavigate();
  const [volunteer, setVolunteer] = useState(null);

  const handleAuthSuccess = (userData) => {
    setVolunteer(userData);
    navigate("/post-job");
  };

  return (
    <div className="min-h-screen bg-[#F7F3FF] flex flex-col">
      {/* ✅ HEADER */}
     <Header volunteer={volunteer} setVolunteer={setVolunteer} />

      {/* ✅ ROUTES */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
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
          <Route path="/admin/jobs" element={<AdminJobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
        </Routes>
      </main>

      {/* ✅ FOOTER */}
      <Footer />
    </div>
  );
}

