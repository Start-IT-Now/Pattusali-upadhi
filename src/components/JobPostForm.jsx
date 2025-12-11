import { useState } from "react";
import { Plus, X } from "lucide-react";
import { supabase } from "../lib/supabase.js";

export default function JobPostForm({ onJobPosted, onCancel }) {
  const [formData, setFormData] = useState({
    job_title: "",
    company_name: "",
    location: "",
    experience: "",
    name: "",
    email: "",
    end_date: "",
    description: "",
  });
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = () => {
    const s = currentSkill.trim();
    if (!s) return;
    if (!skills.includes(s)) {
      setSkills((prev) => [...prev, s]);
    }
    setCurrentSkill("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (skills.length === 0) {
      setMessage({ type: "error", text: "Please add at least one skill" });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const { error } = await supabase.from("jobs").insert([
        {
          ...formData,
          skills,
        },
      ]);

      if (error) {
        setMessage({
          type: "error",
          text: "Failed to post job. Please try again.",
        });
      } else {
        setMessage({ type: "success", text: "Job posted successfully!" });
        setFormData({
          job_title: "",
          company_name: "",
          location: "",
          experience: "",
          name: "",
          email: "",
          end_date: "",
          description: "",
        });
        setSkills([]);
        if (typeof onJobPosted === "function") onJobPosted();
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Unexpected error. Try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 mb-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Post a New Job</h2>
          <p className="text-sm text-gray-600">
            Share role details — candidates will see this on the job board.
          </p>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        )}
      </div>

      {message && (
        <div
          role="status"
          className={`mt-4 mb-4 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800"
              : "bg-rose-50 text-rose-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Job Title *</label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent"
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

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent"
            placeholder="e.g. example@gmail.com"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Contact Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent"
            placeholder="e.g. Ram"
          />
        </div>
      </div>

      {/* Row 3: Skills + End Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Skills */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Skills *</label>

          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent"
              placeholder="Add a skill and press Enter"
              aria-label="Add skill"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-[#6C46CF] text-white rounded-lg hover:bg-[#5935B5] transition-colors flex items-center gap-2"
              aria-label="Add skill button"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200 flex items-center gap-2"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="p-0.5 rounded hover:bg-purple-100"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="w-4 h-4 text-purple-700" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Application End Date */}
        <div className="flex flex-col">
          <label className="block text-gray-700 font-semibold mb-2">Application End Date</label>
          <input
            type="date"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-2">
            Optional — if empty, job will remain open until manually closed.
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Job Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-transparent"
          placeholder="Describe the job role, responsibilities, and requirements..."
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-[#6C46CF] text-white py-3 rounded-lg font-semibold hover:bg-[#5935B5] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Posting..." : "Post Job"}
        </button>

        <button
          type="button"
          onClick={() => {
            setFormData({
              job_title: "",
              company_name: "",
              location: "",
              experience: "",
              name: "",
              email: "",
              end_date: "",
              description: "",
            });
            setSkills([]);
            setCurrentSkill("");
            setMessage(null);
          }}
          className="flex-1 bg-white border border-gray-200 py-3 rounded-lg font-semibold hover:shadow-sm"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
