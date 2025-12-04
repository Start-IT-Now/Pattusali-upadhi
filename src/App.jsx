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
  const [view, setView] = useState("jobs"); // 'jobs' | 'auth' | 'postForm'
  const [searchTerm, setSearchTerm] = useState("");
  const [volunteer, setVolunteer] = useState(null); // logged-in volunteer

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
      skills.some((skill) => skill.toLowerCase().includes(term))
    );
  });

  // When user clicks Volunteer button
  const handleVolunteerClick = () => {
    if (volunteer) {
      setView("postForm");
    } else {
      setView("auth");
    }
  };

  const handleAuthSuccess = (volunteerData) => {
    setVolunteer(volunteerData);
    setView("postForm");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
      {/* HEADER */}
      <header className="bg-white shadow-sm border-b-2 border-brown-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Logo + title */}
            <div className="flex items-center gap-3">
              <img
                src={puv}
                alt="Pattusalli Upadi Vedika Logo"
                className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Pattusali Upadhi Vedhika
                </h1>
                <p className="text-m text-[#cc654d]">
                  Find your dream Opportunity today
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-4">
              {/* Small pill buttons */}
              <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                <button className="px-5 py-1.5 border border-amber-500 bg-amber text-amber-700 rounded-full font-medium hover:bg-amber transition">
                  Guidance
                </button>
                <button className="px-5 py-1.5 border border-amber-500 bg-amber text-amber-700 rounded-full font-medium hover:bg-amber transition">
                  Need Training
                </button>
                <button className="px-5 py-1.5 border border-amber-500 bg-amber text-amber-700 rounded-full font-medium hover:bg-amber transition">
                  Access Company
                </button>
                <button className="px-5 py-1.5 border border-amber-500 bg-amber text-amber-700 rounded-full font-medium hover:bg-amber transition">
                  Contact
                </button>
              </div>

              {/* Volunteer button */}
              <div className="flex justify-start md:justify-end">
                <button
                  onClick={handleVolunteerClick}
                  className="bg-[#cc654d] text-white rounded-full px-6 py-2 sm:py-3 font-semibold hover:bg-sky-600 transition-colors"
                >
                  {volunteer
                    ? "Post a Job"
                    : view === "auth" || view === "postForm"
                    ? "Volunteer"
                    : "Volunteer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
            {/* Search */}
            <div className="mb-6 sm:mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by job title, company, location, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent shadow-sm text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Jobs header */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {searchTerm
                  ? `Search Results (${filteredJobs.length})`
                  : `All Jobs (${jobs.length})`}
              </h2>
            </div>

            {/* Job list */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-sky-500"></div>
                <p className="mt-4 text-gray-600 text-sm sm:text-base">
                  Loading jobs...
                </p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-10 sm:py-12 bg-white rounded-lg shadow-md">
                <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {searchTerm
                    ? "Try adjusting your search terms"
                    : "Be the first to post a job!"}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <div className="mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
}

export default App;
