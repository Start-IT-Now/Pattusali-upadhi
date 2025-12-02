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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-terracotta">
      {/* Job Title + Company */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-brown mb-1">{job.job_title}</h3>
          <p className="text-lg text-terracotta font-semibold">{job.company_name}</p>
        </div>
      </div>

      {/* Job Meta Details */}
      <div className="space-y-2 mb-4">
        {/* Location */}
        <div className="flex items-center text-brown">
          <MapPin className="w-4 h-4 mr-2 text-terracotta" />
          <span>{job.location}</span>
        </div>

        {/* Experience */}
        <div className="flex items-center text-brown">
          <Briefcase className="w-4 h-4 mr-2 text-terracotta" />
          <span>{job.experience}</span>
        </div>

        {/* Name */}
        <div className="flex items-center text-brown">
          <User className="w-4 h-4 mr-2 text-terracotta" />
          <span>{job.name || "—"}</span>
        </div>

        {/* Email */}
        <div className="flex items-center text-brown">
          <Mail className="w-4 h-4 mr-2 text-terracotta" />
          <span>{job.email || "—"}</span>
        </div>

        {/* Posted Date */}
        <div className="flex items-center text-brown">
          <Calendar className="w-4 h-4 mr-2 text-terracotta" />
          <span>Posted on {formatDate(job.created_at)}</span>
        </div>

        {/* Application End Date */}
        {job.application_end_date && (
          <div className="flex items-center text-brown">
            <CalendarClock className="w-4 h-4 mr-2 text-terracotta" />
            <span>Apply by {formatDate(job.end_date)}</span>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.isArray(job.skills) &&
          job.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-sand text-brown rounded-full text-sm font-medium border border-gold"
            >
              {skill}
            </span>
          ))}
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-brown line-clamp-3">{job.description}</p>
      </div>

      {/* Apply Button (No Functionality Yet) */}
      <div className="flex justify-end">
        <button
          type="button"
          className="px-5 py-2 bg-[#cc654d] text-white rounded-full text-sm font-semibold shadow hover:bg-[#cc654d] transition"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
