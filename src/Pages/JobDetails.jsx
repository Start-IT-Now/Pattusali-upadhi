import { useState, useEffect } from "react";
import {
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  User,
  CalendarClock,
  Link,
  X,
} from "lucide-react";

export default function JobDetailsModal({ job, onClose }) {
  if (!job) return null;

  const [showApplyForm, setShowApplyForm] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const d = new Date(dateString);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // check if already applied
  useEffect(() => {
    const checkApplication = async () => {
      const email = localStorage.getItem("applicant_email");
      if (!email) return;

      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/applicants?job_id=eq.${job.id}&applicant_email=eq.${email}`,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      const data = await res.json();

      if (data.length > 0) {
        setAlreadyApplied(true);
      }
    };

    if (job) checkApplication();
  }, [job]);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit application
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/applicants`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          job_id: job.id,
          job_title: job.job_title,
          company_name: job.company_name,
          applicant_name: formData.name,
          applicant_email: formData.email,
          phone: formData.phone,
          education: formData.education,
        }),
      }
    );

    if (res.ok) {
      localStorage.setItem("applicant_email", formData.email);
      setAlreadyApplied(true);
      setShowApplyForm(false);
      alert("Application submitted successfully!");
    } else {
      alert("Failed to submit application");
    }
  };

  return (
    <>
      {/* JOB DETAILS MODAL */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 relative">

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {/* HEADER */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{job.job_title}</h2>
            <p className="text-gray-500 font-medium text-lg">{job.company_name}</p>
          </div>

          {/* CHIPS */}
          <div className="flex flex-wrap gap-2 mb-6">
            {job.company_type && (
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                {job.company_type}
              </span>
            )}

            {job.industry && (
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                {job.industry}
              </span>
            )}

            {job.skills?.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* META INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700 mb-8">

            {job.experience && (
              <div className="flex gap-2 items-center">
                <Briefcase className="w-4 h-4 text-purple-600" />
                {job.experience}
              </div>
            )}

            {job.location && (
              <div className="flex gap-2 items-center">
                <MapPin className="w-4 h-4 text-purple-600" />
                {job.location}
              </div>
            )}

            <div className="flex gap-2 items-center">
              <Calendar className="w-4 h-4 text-purple-600" />
              Posted on {formatDate(job.created_at)}
            </div>

            {job.end_date && (
              <div className="flex gap-2 items-center">
                <CalendarClock className="w-4 h-4 text-purple-600" />
                Apply by {formatDate(job.end_date)}
              </div>
            )}

          </div>

          {/* CONTACT */}
          <div className="bg-gray-50 p-5 rounded-xl mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>

            <div className="flex flex-col gap-2 text-gray-700">

              {job.name && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-600" />
                  {job.name}
                </div>
              )}

              {job.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-600" />
                  {job.email}
                </div>
              )}

              {job.url && (
                <div className="flex items-center gap-2">
                  <Link className="w-4 h-4 text-gray-600" />
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {job.url}
                  </a>
                </div>
              )}

            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">Job Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 pt-4 border-t">

            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              Close
            </button>

            {alreadyApplied ? (
              <button
                disabled
                className="px-6 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
              >
                Already Applied
              </button>
            ) : (
              <button
                onClick={() => setShowApplyForm(true)}
                className="px-6 py-2 bg-[#6C46CF] text-white rounded-lg hover:bg-[#5935B5]"
              >
                Apply Now
              </button>
            )}

          </div>
        </div>
      </div>

      {/* APPLY FORM MODAL */}
      {showApplyForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h3 className="text-lg font-semibold mb-4">
              Apply for {job.job_title}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />

              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                name="education"
                placeholder="Education"
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <div className="flex justify-end gap-2 mt-3">

                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6C46CF] text-white rounded"
                >
                  Submit
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </>
  );
}