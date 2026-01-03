import {
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  User,
  GraduationCap,
  Users,
  Clock,
  Heart,
} from "lucide-react";

export default function JobCard({ job, onView }) {
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-IN") : "—";

  return (
    <article className="bg-white rounded-2xl p-6 shadow-md border hover:shadow-lg transition">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {job.service_type === "job" && job.job_title}
            {job.service_type === "guidance" && job.guidance_type}
            {job.service_type === "training" && job.training_type}
          </h3>

          {job.company_name && (
            <p className="text-sm text-gray-500">{job.company_name}</p>
          )}
        </div>

        <span className="px-3 py-1 text-xs rounded-full bg-purple-50 text-purple-700">
          {job.service_type.toUpperCase()}
        </span>
      </div>

      {/* BODY */}
      <div className="mt-4 space-y-2 text-sm text-gray-700">

        {/* JOB */}
        {job.service_type === "job" && (
          <>
            {job.experience && (
              <div className="flex gap-2 items-center">
                <Briefcase size={16} /> {job.experience} years
              </div>
            )}
            {job.job_type && <div>Job Type: {job.job_type}</div>}
            {job.work_mode && <div>Work Mode: {job.work_mode}</div>}
            {job.hr_name && (
              <div className="flex gap-2 items-center">
                <User size={16} /> {job.hr_name}
              </div>
            )}
            {job.hr_email && (
              <div className="flex gap-2 items-center">
                <Mail size={16} /> {job.hr_email}
              </div>
            )}
          </>
        )}

        {/* GUIDANCE */}
        {job.service_type === "guidance" && (
          <>
            {job.mentor_name && (
              <div className="flex gap-2 items-center">
                <Users size={16} /> {job.mentor_name}
              </div>
            )}
            {job.guidance_mode && <div>Mode: {job.guidance_mode}</div>}
            {job.guidance_slot && <div>Slot: {job.guidance_slot}</div>}
            {job.guidance_period && <div>Period: {job.guidance_period}</div>}
            {job.mentor_email && (
              <div className="flex gap-2 items-center">
                <Mail size={16} /> {job.mentor_email}
              </div>
            )}
          </>
        )}

        {/* TRAINING */}
        {job.service_type === "training" && (
          <>
            {job.trainer_name && (
              <div className="flex gap-2 items-center">
                <GraduationCap size={16} /> {job.trainer_name}
              </div>
            )}
            {job.training_mode && <div>Mode: {job.training_mode}</div>}
            {job.training_duration && (
              <div className="flex gap-2 items-center">
                <Clock size={16} /> {job.training_duration}
              </div>
            )}
            {job.training_topic && <div>Topic: {job.training_topic}</div>}
            {job.training_certification && (
              <div>Certification: {job.training_certification}</div>
            )}
          </>
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-6 flex justify-between items-center">
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Calendar size={14} /> Posted {formatDate(job.created_at)}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onView(job)}
            className="px-4 py-2 text-sm border rounded-md hover:shadow"
          >
            View
          </button>
          <button className="p-2 rounded-full border">
            <Heart size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
