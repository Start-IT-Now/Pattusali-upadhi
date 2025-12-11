import {
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  User,
  CalendarClock,
  Heart,
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

  const chipColors = [
    "bg-sky-50 text-sky-700",
    "bg-emerald-50 text-emerald-700",
    "bg-rose-50 text-rose-700",
    "bg-amber-50 text-amber-700",
    "bg-violet-50 text-violet-700",
  ];

  return (
    <div className="relative bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition">
      {/* Heart (favorite) */}
      <button className="absolute top-4 right-4 p-1.5 rounded-full bg-white shadow-sm">
        <Heart className="w-5 h-5 text-gray-300" />
      </button>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Left: avatar + main content */}
        <div className="flex items-start gap-4 w-full">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-700 shrink-0">
            {job.company_name?.charAt(0) || "C"}
          </div>

          <div className="flex-1 min-w-0">
            {/* Title + company */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-sm font-medium text-gray-500">{job.company_name}</div>
                <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                  {job.job_title}
                </h3>
              </div>
            </div>

            {/* Description */}
            {job.description && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{job.description}</p>
            )}

            {/* Chips */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.slice(0, 5).map((s, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${chipColors[i % chipColors.length]} border ${i % 2 === 0 ? "border-transparent" : "border-gray-100"}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            {/* Meta row: experience, location, posted */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-3">
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

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">Posted {formatDate(job.created_at)}</span>
              </div>
            </div>

            {/* HR name + email (smaller row) */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mt-3">
              {job.name && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{job.name}</span>
                </div>
              )}
              {job.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate max-w-[180px]">{job.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex flex-col justify-center items-center sm:items-end gap-3 min-w-[120px]">
          <button className="px-4 py-2 rounded-md bg-[#6C46CF] text-white text-sm font-semibold shadow-sm hover:bg-[#5935B5]">
            Apply Now
          </button>
          <button className="px-4 py-2 rounded-md bg-white border border-gray-200 text-sm hover:shadow-sm">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
