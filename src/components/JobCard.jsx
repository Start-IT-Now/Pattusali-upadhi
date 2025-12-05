import {
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  User,
  CalendarClock,
} from "lucide-react";

export default function JobCard({ job }) {
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const skills = Array.isArray(job.skills) ? job.skills : [];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 px-6 py-6 hover:shadow-lg transition">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        
        {/* LEFT CONTENT */}
        <div className="flex-1 flex flex-col gap-3">
          
          {/* TITLE + COMPANY */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {job.job_title}
            </h3>
            <p className="text-gray-600 text-sm font-medium">{job.company_name}</p>

          {/* EXPERIENCE + LOCATION */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            {job.experience && (
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-600" />
                <span>{job.experience}</span>
              </div>
            )}

            {job.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span>{job.location}</span>
              </div>
            )}
          </div>
          </div>

          {/* HR NAME + EMAIL */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            {job.name && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-600" />
                <span>{job.name}</span>
              </div>
            )}

            {job.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-600" />
                <span>{job.email}</span>
              </div>
            )}
          </div>

          {/* SKILLS */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* DATE ROW */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-600 mt-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>Posted on {formatDate(job.created_at)}</span>
            </div>

            {job.end_date && (
              <div className="flex items-center gap-1.5">
                <CalendarClock className="w-4 h-4 text-purple-600" />
                <span>Apply by {formatDate(job.end_date)}</span>
              </div>
            )}
          </div>

          {/* DESCRIPTION */}
          {job.description && (
            <p className="text-sm text-gray-700 line-clamp-2 mt-1">
              {job.description}
            </p>
          )}
        </div>

        {/* APPLY BUTTON */}
        <div className="flex sm:items-center sm:justify-center">
          <button
            type="button"
            className="px-8 py-3 rounded-full bg-[#12806A] text-white font-semibold text-sm shadow-md hover:bg-[#0F6B58] transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
