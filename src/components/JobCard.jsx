import { MapPin, Briefcase, Calendar } from 'lucide-react';

export default function JobCard({ job }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-terracotta">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-brown mb-1">{job.job_title}</h3>
          <p className="text-lg text-terracotta font-semibold">{job.company_name}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-brown">
          <MapPin className="w-4 h-4 mr-2 text-terracotta" />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center text-brown">
          <Briefcase className="w-4 h-4 mr-2 text-terracotta" />
          <span>{job.experience}</span>
        </div>

        <div className="flex items-center text-brown">
          <Briefcase className="w-4 h-4 mr-2 text-terracotta" />
          <span>{job.name}</span>
        </div>

        <div className="flex items-center text-brown">
          <Briefcase className="w-4 h-4 mr-2 text-terracotta" />
          <span>{job.email}</span>
        </div>

        <div className="flex items-center text-brown">
          <Calendar className="w-4 h-4 mr-2 text-terracotta" />
          <span>Posted on {formatDate(job.created_at)}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-brown line-clamp-3">{job.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {job.skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-sand text-brown rounded-full text-sm font-medium border border-gold"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
