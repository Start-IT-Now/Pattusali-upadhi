import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import supabase from "../lib/supabase";

const inputBase =
  "w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 outline-none";

export default function JobPostForm({ onJobPosted, onCancel }) {
  const [formData, setFormData] = useState({
    service_type: "job",
    job_title: "",
    company_name: "",
    location: "",
    experience: "",
    company_type: "",
    industry: "",
    description: "",
    hr_email: "",
    end_date: "",
  });

  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(false);

  /* ✅ SINGLE INPUT HANDLER */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ✅ SKILLS */
  const addSkill = () => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkill("");
    }
  };

  const removeSkill = (s) =>
    setSkills(skills.filter((x) => x !== s));

  /* ✅ SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("jobs").insert([
      { ...formData, skills },
    ]);

    setLoading(false);

    if (!error) {
      onJobPosted?.();
      onCancel?.();
    } else {
      alert("Failed to post");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-md p-8 space-y-6"
    >
      {/* HEADER */}
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">Post Opportunity</h2>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>

      {/* SERVICE TYPE */}
      <div>
        <label className="font-semibold">Service Type</label>
        <select
          name="service_type"
          value={formData.service_type}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="job">Job</option>
          <option value="guidance">Guidance</option>
          <option value="training">Training</option>
        </select>
      </div>

      {/* COMMON FIELDS */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Title</label>
          <input
            name="job_title"
            value={formData.job_title}
            onChange={handleInputChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className="font-semibold">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={inputBase}
          />
        </div>
      </div>

      {/* SERVICE-SPECIFIC FIELDS */}
      <AnimatePresence mode="wait">
        {formData.service_type === "job" && (
          <motion.div
            key="job"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div>
              <label className="font-semibold">Experience</label>
              <input
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className={inputBase}
              />
            </div>

            <div>
              <label className="font-semibold">Company Type</label>
              <input
                name="company_type"
                value={formData.company_type}
                onChange={handleInputChange}
                className={inputBase}
              />
            </div>
          </motion.div>
        )}

        {formData.service_type === "guidance" && (
          <motion.div
            key="guidance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <label className="font-semibold">Guidance Topic</label>
            <input
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className={inputBase}
            />
          </motion.div>
        )}

        {formData.service_type === "training" && (
          <motion.div
            key="training"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <label className="font-semibold">Training Area</label>
            <input
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className={inputBase}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SKILLS */}
      <div>
        <label className="font-semibold">Skills</label>
        <div className="flex gap-2 mt-1">
          <input
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className={inputBase}
          />
          <button type="button" onClick={addSkill}>
            <Plus />
          </button>
        </div>

        <div className="flex gap-2 mt-2 flex-wrap">
          {skills.map((s) => (
            <span
              key={s}
              className="bg-purple-100 px-3 py-1 rounded-full flex gap-1"
            >
              {s}
              <X size={14} onClick={() => removeSkill(s)} />
            </span>
          ))}
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="font-semibold">Description</label>
        <textarea
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className={inputBase}
        />
      </div>

      {/* SUBMIT */}
      <button
        disabled={loading}
        className="w-full bg-purple-600 text-white py-3 rounded-lg"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
