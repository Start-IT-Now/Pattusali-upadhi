import { useState, useEffect } from "react";
import { Briefcase, Search } from "lucide-react";
import { supabase } from "./lib/supabase.js";
import JobCard from "./components/JobCard.jsx";
import JobPostForm from "./components/JobPostForm.jsx";
import Footer from "./components/Footer.jsx";
import VolunteerAuth from "./components/VolunteerAuth.jsx";
import puv from "./puv.png";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("jobs");
  const [searchTerm, setSearchTerm] = useState("");
  const [volunteer, setVolunteer] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setJobs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    const skills = Array.isArray(job.skills) ? job.skills : [];

    return (
      job.job_title.toLowerCase().includes(term) ||
      job.company_name.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term) ||
      skills.some((s) => s.toLowerCase().includes(term))
    );
  });

  const handleVolunteerClick = () => {
    if (volunteer) setView("postForm");
    else setView("auth");
  };

  const handleAuthSuccess = (userData) => {
    setVolunteer(userData);
    setView("postForm");
  };

  return (
     <div
    className="min-h-screen"
    style={{
      backgroundColor: "#rgba(202, 188, 234, 1)",
    }}
  >

      {/* HEADER */}
      <header className="bg-white shadow border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <img
                src={puv}
                alt="Logo"
                className="h-16 md:h-20 lg:h-24 w-auto"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Pattusali Upadhi Vedhika
                </h1>
                <p className="text-sm text-gray-600">
                  Find your dream Opportunity today
                </p>
              </div>
            </div>

            {/* Purple Buttons */}
            <div className="flex flex-wrap gap-3">
              {["Guidance", "Need Training", "Access Company", "Contact"].map(
                (label) => (
                  <button
                    key={label}
                    className="px-6 py-2 rounded-full bg-[#6C46CF] text-white text-sm font-semibold shadow hover:bg-[#5935B5] transition"
                  >
                    {label}
                  </button>
                )
              )}

              {/* Volunteer */}
              <button
                onClick={handleVolunteerClick}
                className="px-6 py-2 rounded-full bg-[#12806A] text-white font-semibold shadow hover:bg-[#0F6B58]"
              >
                {volunteer ? "Post a Job" : "Volunteer"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === "auth" ? (
          <VolunteerAuth
            onSuccess={handleAuthSuccess}
            onCancel={() => setView("jobs")}
          />
        ) : view === "postForm" ? (
          <JobPostForm
            onJobPosted={() => {
              fetchJobs();
              setView("jobs");
            }}
          />
        ) : (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by job title, company, location, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-gray-300 shadow focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            {/* Job Count */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              {searchTerm
                ? `Search Results (${filteredJobs.length})`
                : `All Jobs (${jobs.length})`}
            </h2>

            {/* Job List */}
            {loading ? (
              <div className="text-center py-14">
                <div className="animate-spin h-12 w-12 border-b-2 border-purple-600 rounded-full mx-auto"></div>
                <p className="mt-3 text-gray-600">Loading jobs...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12 bg-white shadow rounded-xl">
                <Briefcase className="w-14 h-14 text-gray-400 mx-auto" />
                <p className="text-xl mt-3 font-semibold">No jobs found</p>
                <p className="text-gray-600">
                  {searchTerm ? "Try different keywords" : "Be the first to post a job!"}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
