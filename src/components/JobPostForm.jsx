import { useState } from "react";
import { Plus, X } from "lucide-react";
import supabase  from "../lib/supabase.js";

export default function JobPostForm({ onJobPosted, onCancel }) {
  const [formData, setFormData] = useState({
    job_title: "",
    company_name: "",
    location: "",
    phone: "",
    experience: "",
    service_Type: "job",
    company_type: "",
    industry: "",
    name: "",
    email: "",
    hr_email: "",
    register_number: "",
    company_website: "",
    end_date: "",
    description: "",
  });

  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (!currentSkill.trim()) return;
    if (!skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
    }
    setCurrentSkill("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
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
    phone: "",
    experience: "",
    service_Type: "job",
    company_type: "",
    industry: "",
    name: "",
    email: "",
    hr_email: "",
    register_number: "",
    company_website: "",
    end_date: "",
    description: "",
      });
      setSkills([]);
      if (onJobPosted) onJobPosted();
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
    >
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Post a New Job</h2>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        )}
      </div>

      {message && (
        <div
          className={`p-4 mb-4 rounded-lg ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6">

          <div>
            <label className="font-semibold text-gray-900">Job Title *</label>
            <input
              type="text"
              name="job_title"
              placeholder="e.g. Senior Software Engir"
              value={formData.job_title}
              onChange={handleInputChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-900">Location *</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Hyderabad"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-900">Company Type *</label>
            <select
              name="company_type"
              value={formData.company_type}
              onChange={handleInputChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-purple-300"
            >
              <option value="">Select type</option>
              <option value="Startup">Startup</option>
              <option value="Foreign MNC">Foreign MNC</option>
              <option value="Indian MNC">Indian MNC</option>
              <option value="Corporate">Corporate</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="font-semibold text-gray-900">Skills *</label>

            <div className="flex items-center gap-2 mt-1">
              <input
                type="text"
                placeholder="Add a skill"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 outline-none"
              />
              <button
                type="button"
                onClick={addSkill}
                className="w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center hover:bg-purple-700"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Skills Chips */}
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm"
                >
                  {skill}
                  <X
                    className="w-4 h-4 cursor-pointer"
                    onClick={() => removeSkill(skill)}
                  />
                </span>
              ))}
            </div>
          </div>
{/* Application End Date */}
<div>
  <label className="block text-gray-700 font-semibold mb-2">
    Application End Date
  </label>

  <input
    type="date"
    name="end_date"
    value={formData.end_date}
    onChange={(e) =>
      setFormData({ ...formData, end_date: e.target.value })
    }
    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
           focus:ring-2 focus:ring-purple-300 focus:border-transparent"
  />

  <p className="text-xs text-gray-500 mt-1">
    Optional — leave empty to keep job open.
  </p>
</div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-6">

          <div>
            <label className="font-semibold text-gray-900">Company Name *</label>
            <input
              type="text"
              name="company_name"
              placeholder="e.g. Infosys"
              value={formData.company_name}
              onChange={handleInputChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-900">Experience *</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-purple-300"
            >
              <option value="">Select experience</option>
              <option value="0-1 years">0-1 years (Fresher)</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5-7 years">5-7 years</option>
              <option value="7-10 years">7-10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-gray-900">Industry *</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-purple-300"
            >
              <option value="">Select industry</option>
              <option value="Information & Technology">Information & Technology</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Insurance">Insurance</option>
              <option value="Marketing">Marketing</option>
              <option value="Hardware & Networking">Hardware & Networking</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-gray-900">Service *</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-purple-300"
            >
              <option value="">Select service</option>
              <option value="0-1 years">Training</option>
              <option value="1-3 years">Guidance</option>
              <option value="3-5 years">Internship</option>
              <option value="5-7 years">Job Opprtunity</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-gray-900">Company Register ID *</label>
            <input
              type="text"
              name="register_number"
              placeholder="e.g. 1234567890"
              value={formData.register_number}
              onChange={handleInputChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300"
            />
          </div>

                    <div>
            <label className="font-semibold text-gray-900"> HR Email *</label>
            <input
              type="text"
              name="hr_email"
              placeholder="e.g. example@company.co.in"
              value={formData.hr_email}
              onChange={handleInputChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300"
            />
          </div>

                    <div>
            <label className="font-semibold text-gray-900">Phone *</label>
            <input
              type="text"
              name="phone"
              placeholder="e.g. +91 9876543210"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300"
            />
          </div>

                    <div>
            <label className="font-semibold text-gray-900">Company site *</label>
            <input
              type="text"
              name="company_website"
              placeholder="e.g. www.company.com"
              value={formData.company_website}
              onChange={handleInputChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300"
            />
          </div>

        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <label className="font-semibold text-gray-900">Job Description *</label>
        <textarea
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleInputChange}
          required
          className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-8 bg-purple-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-purple-700 transition disabled:bg-gray-400"
      >
        {isSubmitting ? "Posting..." : "Post Job"}
      </button>
    </form>
  );
}
