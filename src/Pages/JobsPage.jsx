import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import JobCard from "./JobCard";

export default function JobsPage({ serviceType }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("service_type", serviceType)
        .order("created_at", { ascending: false });

      if (!error) setJobs(data || []);
      setLoading(false);
    };

    fetchJobs();
  }, [serviceType]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {jobs.length === 0 ? (
        <p className="text-center">No listings found</p>
      ) : (
        jobs.map(job => <JobCard key={job.id} job={job} />)
      )}
    </div>
  );
}
