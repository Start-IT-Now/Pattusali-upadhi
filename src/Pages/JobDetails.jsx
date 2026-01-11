import {
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  User,
  CalendarClock,
  ArrowLeft,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchJob = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .eq("approval_status", "approved")
        .single();

      if (!error) setJob(data);
      setLoading(false);
    };

    fetchJob();
  }, [id]);

  // Email apply
  const handleApply = async () => {
    const applicant_name = prompt("Enter your name");
    const applicant_email = prompt("Enter your email");

    if (!applicant_name || !applicant_email) return;

    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/resend-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          job_title: job.job_title,
          company_name: job.company_name,
          hr_email: job.hr_email,
          applicant_name,
          applicant_email,
        }),
      }
    );

    alert(res.ok ? "Application sent successfully!" : "Failed to send email");
  };

  if (loading) {
    return <div className="py-20 text-center">Loading…</div>;
  }

  if (!job) {
    return <div className="py-20 text-center">Job not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-purple-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* HEADER */}
      <h2 className="text-2xl font-bold text-gray-900">{job.job_title}</h2>
      <p className="text-gray-500 text-lg mb-6">{job.company_name}</p>

      {/* CHIPS */}
      <div className="flex flex-wrap gap-2 mb-6">
        {job.company_type && (
          <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
            {job.company_type}
          </span>
        )}
        {job.industry && (
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
            {job.industry}
          </span>
        )}
      </div>

      {/* META */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8 text-gray-700">
        {job.experience && (
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-purple-600" />
            {job.experience}
          </div>
        )}
        {job.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-600" />
            {job.location}
          </div>
        )}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-purple-600" />
          Posted on {formatDate(job.created_at)}
        </div>
        {job.end_date && (
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-purple-600" />
            Apply by {formatDate(job.end_date)}
          </div>
        )}
      </div>

      {/* DESCRIPTION */}
      <h3 className="font-semibold mb-2">Job Description</h3>
      <p className="text-gray-700 whitespace-pre-line mb-8">
        {job.description}
      </p>

      {/* ACTION */}
      <div className="flex justify-end">
        <button
          onClick={handleApply}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
