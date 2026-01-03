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
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const service = job.service_type; // job | guidance | training

  return (
    <article className="w-full bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition">
      <div className="flex items-start gap-4 md:gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-purple-100 flex items-center justify-center text-lg font-bold text-purple-700">
            {service?.charAt(0)?.toUpperCase()}
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500 font-medium">
                {service === "job" && job.company_name}
                {service === "guidance" && "Guidance Program"}
                {service === "training" && "Training Program"}
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                {service === "job" && job.job_title}
                {service === "guidance" && job.guidance_type}
                {service === "training" && job.training_title}
              </h3>
            </div>

            {/* Actions */}
            <div className="hidden md:flex flex-col items-end gap-2">
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-md bg-[#6C46CF] text-white text-sm font-semibold">
                  Apply
                </button>
                <button
                  onClick={() => onView?.(job)}
                  className="px-3 py-1 rounded-md bg-white border text-sm"
                >
                  View
                </button>
              </div>
              <button className="p-2 rounded-full bg-white shadow-sm">
                <Heart className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mt-3">
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

            {job.skills?.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            {/* JOB */}
            {service === "job" && (
              <>
                {job.experience && (
                  <Meta icon={Briefcase} value={job.experience} />
                )}
                {job.work_mode && (
                  <Meta icon={MapPin} value={job.work_mode} />
                )}
              </>
            )}

            {/* GUIDANCE */}
            {service === "guidance" && (
              <>
                {job.guidance_mode && (
                  <Meta icon={User} value={job.guidance_mode} />
                )}
                {job.guidance_period && (
                  <Meta icon={CalendarClock} value={job.guidance_period} />
                )}
              </>
            )}

            {/* TRAINING */}
            {service === "training" && (
              <>
                {job.training_mode && (
                  <Meta icon={User} value={job.training_mode} />
                )}
                {job.training_duration && (
                  <Meta icon={CalendarClock} value={job.training_duration} />
                )}
              </>
            )}

            <Meta
              icon={Calendar}
              value={`Posted ${formatDate(job.created_at)}`}
              muted
            />

            {job.hr_email && (
              <Meta icon={Mail} value={job.hr_email} />
            )}
          </div>

          {/* Description */}
          {job.description && (
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">
              {job.description}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

/* Small helper */
function Meta({ icon: Icon, value, muted }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${muted ? "text-gray-400" : "text-purple-600"}`} />
      <span className={muted ? "text-gray-500 text-xs" : ""}>{value}</span>
    </div>
  );
}
