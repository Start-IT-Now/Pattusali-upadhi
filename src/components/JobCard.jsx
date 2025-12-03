import {
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  User,
  CalendarClock
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
   <div className="bg-white rounded-2xl shadow-sm border border-brown/10 px-6 py-5 hover:shadow-md transition-shadow">
      {/* Main horizontal layout */}
      <div className="flex items-stretch gap-6">
        {/* LEFT: Job details */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Title + company */}
          <div>
            <h3 className="text-lg font-bold text-brown leading-snug">
              {job.job_title}
            </h3>
            <p className="text-sm font-semibold text-terracotta mt-0.5">
              {job.company_name}
            </p>
          </div>

          {/* Meta row: experience + location */}
          <div className="flex flex-wrap gap-4 text-sm text-brown">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-terracotta" />
              <span>{job.experience}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-terracotta" />
              <span>{job.location}</span>
            </div>
          </div>

          {/* Contact row */}
          <div className="flex flex-wrap gap-4 text-sm text-brown">
            {job.name && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-terracotta" />
                <span>{job.name}</span>
              </div>
            )}
            {job.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-terracotta" />
                <span>{job.email}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-brown/90 line-clamp-2">
            {job.description}
          </p>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-sand text-brown rounded-full text-xs font-medium border border-gold"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Dates */}
          <div className="flex flex-wrap gap-4 text-xs text-brown/70 mt-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-terracotta" />
              <span>Posted on {formatDate(job.created_at)}</span>
            </div>
            {job.application_end_date && (
              <div className="flex items-center gap-1.5">
                <CalendarClock className="w-4 h-4 text-terracotta" />
                <span>Apply by {formatDate(job.application_end_date)}</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Apply button */}
        <div className="flex items-center">
          <button
            type="button"
            className="px-8 py-3 rounded-full bg-terracotta text-white font-semibold text-sm shadow-md hover:bg-[#cc654d] transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}