import {
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  User,
  Clock,
  GraduationCap,
  Heart,
} from "lucide-react";

export default function JobCard({ job, onView }) {
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-IN") : "—";

  const service = job.service_type;

  return (
    <article className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <span className="text-xs uppercase tracking-wide text-purple-600 font-semibold">
            {service}
          </span>

          <h3 className="text-lg font-bold text-gray-900 mt-1">
            {job.job_title}
          </h3>

          {job.company_name && (
            <p className="text-sm text-gray-600">{job.company_name}</p>
          )}
        </div>

        <button className="p-2 rounded-full hover:bg-gray-100">
          <Heart className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Service-specific content */}
      <div className="mt-4 space-y-3 text-sm text-gray-700">

        {/* ================= JOB ================= */}
        {service === "job" && (
          <>
            {job.location && (
              <Meta icon={MapPin} label={job.location} />
            )}
            {job.experience && (
              <Meta icon={Briefcase} label={`${job.experience} yrs`} />
            )}
            {job.work_mode && (
              <Meta icon={Clock} label={job.work_mode} />
            )}
            {job.hr_email && (
              <Meta icon={Mail} label={job.hr_email} />
            )}

            {job.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-full bg-purple-50 text-purple-700 text-xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </>
        )}

        {/* ================= GUIDANCE ================= */}
        {service === "guidance" && (
          <>
            <Meta icon={User} label={`Mentor: ${job.mentor_name}`} />
            <Meta icon={Clock} label={`Slot: ${job.guidance_slot}`} />
            <Meta icon={Calendar} label={`Period: ${job.guidance_period}`} />
            <Meta icon={Mail} label={job.mentor_email} />
          </>
        )}

        {/* ================= TRAINING ================= */}
        {service === "training" && (
          <>
            <Meta icon={GraduationCap} label={job.training_topic} />
            <Meta icon={User} label={`Trainer: ${job.trainer_name}`} />
            <Meta icon={Clock} label={`Duration: ${job.training_duration}`} />
            {job.training_certification && (
              <Meta
                icon={Calendar}
                label={`Certificate: ${job.training_certification}`}
              />
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t">
        <span className="text-xs text-gray-500">
          Apply by: {formatDate(job.end_date)}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onView(job)}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
          >
            View
          </button>
          <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Apply
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------- Reusable Meta Row ---------- */
function Meta({ icon: Icon, label }) {
  if (!label) return null;
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-purple-600" />
      <span>{label}</span>
    </div>
  );
}
