import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    supabase
      .from("jobs")
      .select("*")
      .eq("status", "pending")
      .then(({ data }) => setJobs(data || []));
  }, []);

  const updateStatus = async (id, status) => {
    await supabase
      .from("jobs")
      .update({ status })
      .eq("id", id);

    setJobs(jobs.filter(j => j.id !== id));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Pending Jobs</h1>

      {jobs.map(job => (
        <div key={job.id} className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">{job.job_title}</h3>
          <p className="text-sm text-gray-600">{job.company_name}</p>

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => updateStatus(job.id, "approved")}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Approve
            </button>

            <button
              onClick={() => updateStatus(job.id, "rejected")}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
