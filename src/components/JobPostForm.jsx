import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { supabase } from '../lib/supabase.js';

export default function JobPostForm({ onJobPosted }) {
  const [formData, setFormData] = useState({
    job_title: '',
    company_name: '',
    location: '',
    experience: '',
    name: '',
    email: '',
    end_date: '',
    description: '',
  });
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (skills.length === 0) {
      setMessage({ type: 'error', text: 'Please add at least one skill' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const { error } = await supabase
      .from('jobs')
      .insert([
        {
          ...formData,
          skills,
        },
      ]);

    setIsSubmitting(false);

    if (error) {
      setMessage({ type: 'error', text: 'Failed to post job. Please try again.' });
    } else {
      setMessage({ type: 'success', text: 'Job posted successfully!' });
      setFormData({
        job_title: '',
        company_name: '',
        location: '',
        experience: '',
        name: '',
        email: '',
        end_date: '',
        description: '',
      });
      setSkills([]);
      onJobPosted();
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job</h2>

      {message && (
        <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Job Title *</label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="e.g., Senior Software Engineer"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Company Name *</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="e.g., Tech Solutions Inc."
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="e.g., Mumbai, India"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Experience Required *</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            <option value="">Select experience level</option>
            <option value="0-1 years">0-1 years (Fresher)</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5-7 years">5-7 years</option>
            <option value="7-10 years">7-10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email *</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="e.g. example@gmail.com"
          />
        </div>

                <div>
          <label className="block text-gray-700 font-semibold mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="e.g. Ram"
          />
        </div>
        </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Skills *</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            placeholder="Add a skill and press Enter"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-sm font-medium border border-sky-200 flex items-center gap-2"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:text-sky-900"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
  <label className="text-sm font-medium text-brown">Application End Date</label>
  <input
    type="date"
    className="border border-gold rounded-md p-2 text-brown"
    value={formData.end_date}
    onChange={(e) =>
      setFormData({ ...formData,end_date: e.target.value })
    }
  />
</div>


      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Job Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          placeholder="Describe the job role, responsibilities, and requirements..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-sky-500 text-white py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Posting...' : 'Post Job'}
      </button>
    </form>
  );
}
