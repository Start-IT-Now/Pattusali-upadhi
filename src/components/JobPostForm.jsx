import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import supabase from "../lib/supabase";

export default function JobPostForm({ onJobPosted, onCancel }) {
  const [formData, setFormData] = useState({
    service_type: "job",

    // common
    job_title: "",
    description: "",
    skills: [],

    // job
    company_name: "",
    location: "",
    experience: "",
    company_type: "",
    industry: "",
    end_date: "",
    hr_email: "",

    // guidance
    mentor_name: "",
    mentor_email: "",

    // training
    trainer_name: "",
    trainer_email: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addSkill = () => {
    if (!skillInput.trim()) return;
    setFormData({
      ...formData,
      skills: [...formData.skills, skillInput.trim()],
    });
    setSkillInput("");
  };

  const removeSkill = (s) =>
    setFormData({
      ...formData,
      skills: formData.skills.filter((x) => x !== s),
    });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("jobs").insert([formData]);

    setLoading(false);
    if (!error) onJobPosted?.();
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-3xl shadow-md p-8 space-y-8"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Post a New Opportunity</h2>
        <button onClick={onCancel} type="button" className="text-gray-500">
          Cancel
        </button>
      </div>

      {/* Service Type */}
      <div>
        <label className="font-semibold">Service Type</label>
        <select
          name="service_type"
          value={formData.service_type}
          onChange={update}
          className="input mt-1"
        >
          <option value="job">Job</option>
          <option value="guidance">Guidance</option>
          <option value="training">Training</option>
        </select>
      </div>

      {/* Common Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Title" name="job_title" value={formData.job_title} onChange={update} />
        <Field label="Description" name="description" value={formData.description} onChange={update} />
      </div>

      {/* Skills */}
      <div>
        <label className="font-semibold">Skills *</label>
        <div className="flex gap-2 mt-1">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            className="input flex-1"
          />
          <button type="button" onClick={addSkill} className="btn-primary">
            <Plus size={16} />
          </button>
        </div>

        <div className="flex gap-2 mt-2 flex-wrap">
          {formData.skills.map((s) => (
            <span key={s} className="chip">
              {s}
              <X size={14} onClick={() => removeSkill(s)} />
            </span>
          ))}
        </div>
      </div>

      {/* Animated Service Sections */}
      <AnimatePresence mode="wait">
        {formData.service_type === "job" && (
          <AnimatedSection key="job">
            <SectionTitle>Job Details</SectionTitle>
            <Grid>
              <Field label="Company" name="company_name" value={formData.company_name} onChange={update} />
              <Field label="Location" name="location" value={formData.location} onChange={update} />
              <Field label="Experience" name="experience" value={formData.experience} onChange={update} />
              <Field label="HR Email" name="hr_email" value={formData.hr_email} onChange={update} />
            </Grid>
          </AnimatedSection>
        )}

        {formData.service_type === "guidance" && (
          <AnimatedSection key="guidance">
            <SectionTitle>Mentor Details</SectionTitle>
            <Grid>
              <Field label="Mentor Name" name="mentor_name" value={formData.mentor_name} onChange={update} />
              <Field label="Mentor Email" name="mentor_email" value={formData.mentor_email} onChange={update} />
            </Grid>
          </AnimatedSection>
        )}

        {formData.service_type === "training" && (
          <AnimatedSection key="training">
            <SectionTitle>Trainer Details</SectionTitle>
            <Grid>
              <Field label="Trainer Name" name="trainer_name" value={formData.trainer_name} onChange={update} />
              <Field label="Trainer Email" name="trainer_email" value={formData.trainer_email} onChange={update} />
            </Grid>
          </AnimatedSection>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button disabled={loading} className="btn-primary w-full">
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}

/* ---------------- helpers ---------------- */

const AnimatedSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.35, ease: "easeInOut" }}
    className="overflow-hidden"
  >
    {children}
  </motion.div>
);

const Grid = ({ children }) => (
  <div className="grid md:grid-cols-2 gap-6">{children}</div>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-xl font-semibold mb-4">{children}</h3>
);

const Field = ({ label, ...props }) => (
  <div>
    <label className="font-medium">{label}</label>
    <input {...props} className="input mt-1" />
  </div>
);
