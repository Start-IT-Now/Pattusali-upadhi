import { useState } from "react";
import { Plus, X } from "lucide-react";
import supabase from "../lib/supabase.js";

export default function JobPostForm({ onJobPosted, onCancel }) {
  const [formData, setFormData] = useState({
    job_title: "",
    company_name: "",
    location: "",
    phone: "",
    experience: "",
    service_type: "job",

    company_type: "",
    industry: "",
    representative_name: "",
    representative_email: "",
    hr_email: "",
    register_number: "",
    company_website: "",
    end_date: "",
    description: "",

    mentor_name: "",
    mentor_email: "",
    trainer_name: "",
    trainer_email: "",
  });

  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    const skill = currentSkill.trim();
    if (!skill || skills.includes(skill)) return;
    setSkills([...skills, skill]);
    setCurrentSkill("");
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!skills.length) {
      setMessage({ type: "error", text: "Please add at least one skill." });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const { error } = await supabase.from("jobs").insert([
      {
        ...formData,
        skills,
        created_at: new Date(),
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Job posted successfully!" });
      setSkills([]);
      setFormData({
        job_title: "",
        company_name: "",
        location: "",
        phone: "",
        experience: "",
        service_type: "job",
        company_type: "",
        industry: "",
        representative_name: "",
        representative_email: "",
        hr_email: "",
        register_number: "",
        company_website: "",
        end_date: "",
        description: "",
        mentor_name: "",
        mentor_email: "",
        trainer_name: "",
        trainer_email: "",
      });

      onJobPosted?.();
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-md border border-gray-100 p-8"
    >
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">Post a New Job</h2>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-gray-600">
            Cancel
          </button>
        )}
      </div>

      {/* Message */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          <inputField label="Job Title" name="job_title" value={formData.job_title} onChange={handleInputChange} />
          <inputField label="Location" name="location" value={formData.location} onChange={handleInputChange} />
          <inputField label="Representative Name" name="representative_name" value={formData.representative_name} onChange={handleInputChange} />
          <inputField label="Representative Email" name="representative_email" value={formData.representative_email} onChange={handleInputChange} />

          {/* Skills */}
          <div>
            <label className="font-semibold">Skills *</label>
            <div className="flex gap-2 mt-1">
              <input
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                className="flex-1 input"
              />
              <button type="button" onClick={addSkill} className="bg-purple-600 text-white px-3 rounded">
                <Plus size={18} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((s) => (
                <span key={s} className="bg-purple-100 px-3 py-1 rounded-full text-sm flex gap-1">
                  {s}
                  <X size={14} onClick={() => removeSkill(s)} className="cursor-pointer" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">
          <inputField label="Company Name" name="company_name" value={formData.company_name} onChange={handleInputChange} />
          <inputField label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
          <inputField label="HR Email" name="hr_email" value={formData.hr_email} onChange={handleInputChange} />

          <selectField
            label="Service Type"
            name="service_type"
            value={formData.service_type}
            onChange={handleInputChange}
            options={["job", "guidance", "training"]}
          />

          {formData.service_type === "job" && (
            <>
              <selectField
                label="Experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                options={["0-1 years", "1-3 years", "3-5 years", "5+ years"]}
              />
              <inputField label="Application End Date" type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} />
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <textarea
        className="w-full mt-6 input"
        rows="5"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Job Description"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg"
      >
        {isSubmitting ? "Posting..." : "Post Job"}
      </button>
    </form>
  );
}

/* Reusable Inputs */
const inputField = ({ label, ...props }) => (
  <div>
    <label className="font-semibold">{label}</label>
    <input {...props} className="input w-full mt-1" />
  </div>
);

const selectField = ({ label, options, ...props }) => (
  <div>
    <label className="font-semibold">{label}</label>
    <select {...props} className="input w-full mt-1">
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);
