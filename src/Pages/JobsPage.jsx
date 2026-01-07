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

 const fetchListings = async () => {
  setLoading(true);

  try {
    let query = supabase
      .from("jobs")
      .select("*")
      .eq("service_type", servicetype);

    /* ---------- COMMON SEARCH ---------- */
    if (searchTerm) {
      query = query.ilike("title", `%${searchTerm}%`);
    }

    /* ---------- JOB FILTERS ---------- */
    if (servicetype === "job") {
      if (filters.location?.length) {
        query = query.in("location", filters.location);
      }

      if (filters.companyType?.length) {
        query = query.in("company_type", filters.companyType);
      }

      if (filters.industry?.length) {
        query = query.in("industry", filters.industry);
      }
    }

    /* ---------- GUIDANCE FILTERS ---------- */
    if (servicetype === "guidance") {
      if (filters.mentor) {
        query = query.ilike("mentor_name", `%${filters.mentor}%`);
      }

      if (filters.mode?.length) {
        query = query.in("session_mode", filters.mode);
      }

      if (filters.slot?.length) {
        query = query.in("time_slot", filters.slot);
      }
    }

    /* ---------- TRAINING FILTERS ---------- */
    if (servicetype === "training") {
      if (filters.topic) {
        query = query.ilike("training_topic", `%${filters.topic}%`);
      }

      if (filters.duration?.length) {
        query = query.in("training_duration", filters.duration);
      }

      if (filters.certification?.length) {
        query = query.in("certification", filters.certification);
      }
    }

    const { data, error } = await query;

    if (error) throw error;

    setJobs(data || []);
  } catch (err) {
    console.error("Fetch error:", err);
    setJobs([]);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchListings();
}, [servicetype, filters, searchTerm]);


  // ✅ MUST RE-RUN WHEN servicetype CHANGES
useEffect(() => {
  setFilters({});
}, [servicetype]);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
      <aside className="sticky top-24 self-start">
 <Filterbar
  servicetype={servicetype}
  filters={filters}
  setFilters={setFilters}
/>

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
