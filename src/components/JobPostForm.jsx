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
    company_type: "",   
    industry: "",       
  });

  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const COMPANY_TYPES = [
    "Startup",
    "Foreign MNC",
    "Indian MNC",
    "Corporate",
    "Others",
  ];

  const INDUSTRIES = [
    "Financial Services",
    "Insurance",
    "Marketing",
    "Information & Technology",
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    const s = currentSkill.trim();
    if (s && !skills.includes(s)) setSkills([...skills, s]);
    setCurrentSkill("");
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((x) => x !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (skills.length === 0) {
      setMessage({ type: "error", text: "Please add at least one skill" });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const { error } = await supabase.from("jobs").insert([
      {
        ...formData,
        skills,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      setMessage({ type: "error", text: "Failed to post job. Please try again." });
      return;
    }

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
      company_type: "",
      industry: "",
    });

    setSkills([]);

    if (onJobPosted) onJobPosted();

    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 mb-8"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Post a New Job</h2>
        {onCancel && (
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>

      {message && (
        <div
          className={`mt-4 mb-4 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        {/* Job Title */}
        <div>
          <label className="font-semibold text-gray-700">Job Title *</label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleInputChange}
            required
            className="input-field"
            placeholder="e.g. Senior Software Engineer"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="font-semibold text-gray-700">Company Name *</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            required
            className="input-field"
            placeholder="e.g. Infosys"
          />
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold text-gray-700">Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="input-field"
            placeholder="e.g. Hyderabad"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="font-semibold text-gray-700">Experience *</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            <option value="">Select experience</option>
            <option value="0-1 years">0-1 years</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5-7 years">5-7 years</option>
            <option value="7-10 years">7-10 years</option>
            <option value="10+ years">10+ years</option>
          </select>
        </div>
      </div>

      {/* Row 2 — NEW: Company Type + Industry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

        {/* Company Type */}
        <div>
          <label className="font-semibold text-gray-700">Company Type *</label>
          <select
            name="company_type"
            value={formData.company_type}
            onChange={handleInputChange}
            required
            className="input-field"
          >
            <option value="">Select type</option>
            {COMPANY_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Industry */}
        <div>
          <label className="font-semibold text-gray-700">Industry *</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            required
            className="input-field"
          >
            <option value="">Select industry</option>
            {INDUSTRIES.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">Skills *</label>

        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            className="input-field flex-1"
            placeholder="Add a skill"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-[#6C46CF] text-white rounded-lg hover:bg-[#5935B5]"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full flex items-center gap-2"
            >
              {skill}
              <button onClick={() => removeSkill(skill)}>
                <X className="w-4 h-4 text-purple-700" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="font-semibold text-gray-700">Job Description *</label>
        <textarea
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleInputChange}
          className="input-field"
          required
        ></textarea>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#6C46CF] text-white py-3 rounded-lg hover:bg-[#5935B5]"
      >
        {isSubmitting ? "Posting..." : "Post Job"}
      </button>
    </form>
  );
}
