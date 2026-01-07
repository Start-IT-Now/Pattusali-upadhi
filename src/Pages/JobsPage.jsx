import { useEffect, useState, useCallback } from "react";
import { Search } from "lucide-react";
import supabase from "../lib/supabase";
import JobCard from "../Pages/JobCard.jsx";
import Filterbar from "../components/FilterBar.jsx";

export default function JobsPage({ servicetype }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: null,
    companyType: [],
    industry: [],
  });

  const fetchJobs = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    // ✅ SERVICE TYPE FILTER (CRITICAL)
    if (servicetype) {
      query = query.eq("service_type", servicetype);
    }

    // search
    if (searchTerm) {
      query = query.or(
        `job_title.ilike.%${searchTerm}%,company_name.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("Jobs fetch error:", error);
      setJobs([]);
    } else {
      setJobs(data || []);
    }

    setLoading(false);
  }, [servicetype, searchTerm, filters]);

  // ✅ MUST RE-RUN WHEN servicetype CHANGES
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
      <aside className="sticky top-24 self-start">
        <Filterbar filters={filters} setFilters={setFilters} />
      </aside>

      <section className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search jobs..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            No listings found
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
