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
          <h3 className="text-lg font-bold text-gray-900">
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

      {/* ================= SINGLE HORIZONTAL META ROW ================= */}
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-gray-700">

        {/* -------- JOB -------- */}
        {service === "job" && (
          <>
            <MetaInline icon={MapPin} label={job.location} />
            <MetaInline icon={Briefcase} label={job.experience && `${job.experience} yrs`} />
            <MetaInline icon={Clock} label={job.work_mode} />
            <MetaInline icon={Mail} label={job.hr_email} />

            {job.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </>
        )}

        {/* -------- GUIDANCE -------- */}
        {service === "guidance" && (
          <>
            <MetaInline icon={User} label={job.mentor_name && `Mentor: ${job.mentor_name}`} />
            <MetaInline icon={Clock} label={job.guidance_slot} />
            <MetaInline icon={Calendar} label={job.guidance_period} />
            <MetaInline icon={Mail} label={job.mentor_email} />
          </>
        )}

        {/* -------- TRAINING -------- */}
        {service === "training" && (
          <>
            <MetaInline icon={GraduationCap} label={job.training_topic} />
            <MetaInline icon={User} label={job.trainer_name && `Trainer: ${job.trainer_name}`} />
            <MetaInline icon={Clock} label={job.training_duration} />
            {job.training_certification && (
              <MetaInline
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

/* ---------- INLINE META (single-line safe) ---------- */
function MetaInline({ icon: Icon, label }) {
  if (!label) return null;
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <Icon className="w-4 h-4 text-purple-600" />
      <span>{label}</span>
    </div>
  );
}

