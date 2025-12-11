import { useState, useEffect } from "react";
import { Search, Briefcase } from "lucide-react";
import { supabase } from "./lib/supabase.js";
import JobCard from "./components/JobCard.jsx";
import JobPostForm from "./components/JobPostForm.jsx";
import Footer from "./components/Footer.jsx";
import VolunteerAuth from "./components/VolunteerAuth.jsx";
import Filterbar from "./components/FilterBar.jsx";
import puv from "./puv.png";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("jobs");
  const [searchTerm, setSearchTerm] = useState("");
  const [volunteer, setVolunteer] = useState(null);
  // basic filter state (expand as needed)
  const [filters, setFilters] = useState({ location: null, companyType: [], industry: [] });

  const fetchJobs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    const skills = Array.isArray(job.skills) ? job.skills : [];
    const matchesSearch =
      job.job_title.toLowerCase().includes(term) ||
      job.company_name.toLowerCase().includes(term) ||
      job.location?.toLowerCase().includes(term) ||
      skills.some((s) => s.toLowerCase().includes(term));
    // basic filter logic (expandable)
    const matchesLocation = !filters.location || job.location === filters.location;
    return matchesSearch && matchesLocation;
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
    <div className="min-h-screen bg-[#F7F3FF] text-gray-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={puv} alt="logo" className="w-14 h-14 rounded-md object-cover" />
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Pattusali Upadhi Vedhika</h1>
              <p className="text-sm text-gray-600">Find your dream Opportunity today</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex gap-2">
              {["Guidance", "Need Training", "Access Company", "Contact"].map((t) => (
                <button key={t} className="px-4 py-2 rounded-full bg-[#6C46CF] text-white text-sm font-semibold shadow-sm hover:opacity-95">
                  {t}
                </button>
              ))}
            </div>
            <button
              onClick={handleVolunteerClick}
              className="px-4 py-2 rounded-full bg-[#6C46CF] text-white text-sm font-semibold shadow-md"
            >
              {volunteer ? "Post a Job" : "Volunteer"}
            </button>
          </div>
        </div>
      </header>

      {/* Main area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === "auth" ? (
          <VolunteerAuth onSuccess={handleAuthSuccess} onCancel={() => setView("jobs")} />
        ) : view === "postForm" ? (
          <JobPostForm onJobPosted={() => { fetchJobs(); setView("jobs"); }} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="sticky top-24 self-start">
              <Filterbar filters={filters} setFilters={setFilters} />
            </aside>

            {/* Content column */}
            <section className="space-y-6">
              {/* Search bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by job title, company, location, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-600">Showing <span className="font-semibold">{filteredJobs.length}</span> jobs</div>
                  <button className="px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm">Sort</button>
                </div>
              </div>

              {/* Grid of cards */}
              {loading ? (
                <div className="py-20 text-center">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
                  <p className="mt-4 text-gray-600">Loading jobs...</p>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center shadow">No jobs found</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}

              <Footer />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
