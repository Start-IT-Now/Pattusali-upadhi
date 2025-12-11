import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import supabase  from "./lib/supabase.js";
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

  // filters (same shape as FilterSidebar)
  const [filters, setFilters] = useState({
    location: null,
    companyType: [],
    industry: [],
  });

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 9; // change as needed
  const [total, setTotal] = useState(0);

  // helper: build and run a server-side query
  const fetchJobs = useCallback(
    async ({ page = 1, pageSize = 9, search = "", filters = {} } = {}) => {
      setLoading(true);

      try {
        const start = (page - 1) * pageSize;
        const end = start + pageSize - 1;

        // base query: select all, ask for exact count
        let query = supabase
          .from("jobs")
          .select("*", { count: "exact" })
          .order("created_at", { ascending: false })
          .range(start, end);

        // 1) text search across job_title, company_name, location (server-side)
        const term = (search || "").trim();
        if (term) {
          // PostgREST 'or' expression: fields separated by comma, each using ilike
          // Example: or=(job_title.ilike.%term%,company_name.ilike.%term%,location.ilike.%term%)
          const escaped = term.replace(/%/g, "\\%").replace(/,/g, "\\,"); // mild escaping
          const orExpr = `job_title.ilike.%${escaped}%,company_name.ilike.%${escaped}%,location.ilike.%${escaped}%`;
          query = query.or(orExpr);
        }

        // 2) location filter (single)
        if (filters.location) {
          query = query.eq("location", filters.location);
        }

        // 3) companyType filter (multi) - expects a string column `company_type`
        if (Array.isArray(filters.companyType) && filters.companyType.length > 0) {
          // use .in for simple string columns
          query = query.in("company_type", filters.companyType);
        }

        // 4) industry filter (multi) - expects a string column `industry`
        if (Array.isArray(filters.industry) && filters.industry.length > 0) {
          query = query.in("industry", filters.industry);
        }

        // Run query
        const { data, error, count } = await query;

        if (error) {
          console.error("Supabase fetchJobs error:", error);
          setJobs([]);
          setTotal(0);
        } else {
          setJobs(Array.isArray(data) ? data : []);
          // count should be an integer when { count: 'exact' } used
          setTotal(typeof count === "number" ? count : 0);
        }
      } catch (err) {
        console.error("Unexpected fetchJobs error:", err);
        setJobs([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // fetch initial + whenever page/search/filters change
  useEffect(() => {
    // reset to page 1 when search or filters change
    setPage(1);
    fetchJobs({ page: 1, pageSize, search: searchTerm, filters });
  }, [fetchJobs, searchTerm, filters]); // eslint-disable-line

  // fetch when page changes (but not when page reset above triggers)
  useEffect(() => {
    fetchJobs({ page, pageSize, search: searchTerm, filters });
  }, [page]); // eslint-disable-line

  const handleVolunteerClick = () => {
    if (volunteer) setView("postForm");
    else setView("auth");
  };

  const handleAuthSuccess = (userData) => {
    setVolunteer(userData);
    setView("postForm");
  };

  // pagination helpers
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(lastPage, p + 1));

  return (
    <div className="min-h-screen bg-[#F7F3FF] text-gray-900">
      {/* Header (unchanged) */}
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
            <button onClick={handleVolunteerClick} className="px-4 py-2 rounded-full bg-[#6C46CF] text-white text-sm font-semibold shadow-md">
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
          <JobPostForm
            onJobPosted={() => {
              // refresh list when a job is posted (stay on current page)
              fetchJobs({ page, pageSize, search: searchTerm, filters });
              setView("jobs");
            }}
            onCancel={() => setView("jobs")}
          />
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
                    placeholder="Search by job title, company, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{total}</span> results
                  </div>
                </div>
              </div>

              {/* Grid of cards */}
              {loading ? (
                <div className="py-20 text-center">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600" />
                  <p className="mt-4 text-gray-600">Loading jobs...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center shadow">No jobs found</div>
              ) : (
                <>
  {/* single column list (one horizontal card per row) */}
<div className="flex flex-col gap-6">
  {jobs.map((job) => (
    <JobCard key={job.id} job={job} />
  ))}
</div>


                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-600">
                      Page {page} of {lastPage} — {total} results
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={goPrev}
                        disabled={page <= 1}
                        className="px-3 py-2 rounded-md bg-white border border-gray-200 text-sm disabled:opacity-50"
                      >
                        Prev
                      </button>
                      <button
                        onClick={goNext}
                        disabled={page >= lastPage}
                        className="px-3 py-2 rounded-md bg-white border border-gray-200 text-sm disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}

              <Footer />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
