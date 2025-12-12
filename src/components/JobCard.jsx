import {
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  User,
  CalendarClock,
  Heart,
} from "lucide-react";

export default function JobCard({ job, onView }) {
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const d = new Date(dateString);
    return d.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
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
    <article className="w-full bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition">
      <div className="flex items-start gap-4 md:gap-6">
        {/* LEFT: avatar */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-700">
            {job.company_name?.charAt(0) || "C"}
          </div>
        </div>

        {/* MIDDLE: main details (grows) */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm text-gray-500 font-medium">{job.company_name}</div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight line-clamp-2">
                {job.job_title}
              </h3>
            </div>

            {/* small meta on top-right for large screens */}
            <div className="hidden md:flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded-md bg-[#6C46CF] text-white text-sm font-semibold shadow-sm hover:bg-[#5935B5]">
                  Apply
                </button>
<button
  onClick={() => onView && onView(job)}
  className="px-3 py-1 rounded-md bg-white border border-gray-200 text-sm hover:shadow-sm"
>
  View Details
</button>

              </div>
              <button className="p-2 rounded-full bg-white shadow-sm">
                <Heart className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {job.company_type && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                {job.company_type}
              </span>
            )}
            {job.industry && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 border border-sky-100">
                {job.industry}
              </span>
            )}


          {/* bottom meta row */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
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

            {/* contact (mobile shows under meta) */}
            <div className="flex items-center gap-2">
              {job.name && <User className="w-4 h-4 text-gray-400" />}
              {job.email && <Mail className="w-4 h-4 text-gray-400" />}
              <span className="truncate max-w-[240px] text-sm text-gray-700">{job.name ? job.name : job.email ?? ""}</span>

            </div>

                        {skills.slice(0, 4).map((s, i) => (
              <span
                key={i}
                className={`px-2 py-1 rounded-full text-xs font-medium ${chipColors[i % chipColors.length]} border ${i % 2 === 0 ? "border-transparent" : "border-gray-100"}`}
              >
                {s}
              </span>
            ))}

          </div>
          </div>
                                             {/* description + chips */}
          {job.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{job.description}</p>
          )}
        </div>    

        {/* RIGHT (mobile: shown inline below) */}
        <div className="flex flex-col items-end gap-3 md:hidden ml-2">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded-md bg-[#6C46CF] text-white text-sm font-semibold shadow-sm hover:bg-[#5935B5]">
              Apply
            </button>
<button
  onClick={onView}
  className="px-4 py-2 rounded-md bg-white border border-gray-200 text-sm hover:shadow-sm"
>
  View Details
</button>


          </div>
          <button className="p-2 rounded-full bg-white shadow-sm">
            <Heart className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>
    </article>
  );
}
