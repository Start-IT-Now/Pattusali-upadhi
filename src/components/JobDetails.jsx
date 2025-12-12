import {
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  User,
  CalendarClock,
  X,
} from "lucide-react";

export default function JobDetailsModal({ job, onClose }) {
  if (!job) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const d = new Date(dateString);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      
      {/* CARD */}
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

        {/* CONTACT SECTION */}
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

          <button className="px-6 py-2 bg-[#6C46CF] text-white rounded-lg hover:bg-[#5935B5] shadow transition">
            Apply Now
          </button>
        </div>

      </div>
    </div>
  );
}
