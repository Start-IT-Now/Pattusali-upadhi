import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import supabase from "../lib/supabase";
import { FormField } from "./Form/FormField.jsx";


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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
<FormField label="Email" required>
  <input
    type="email"
    name="email"
    placeholder="e.g. example@gmail.com"
    value={formData.email}
    onChange={handleInputChange}
    className={inputBase}
  />
</FormField>

<FormField label="Service Type" required>
  <select
    name="service_type"
    value={formData.service_type}
    onChange={handleInputChange}
    className={selectBase}
  >
    <option value="job">Job / Internship</option>
    <option value="guidance">Guidance</option>
    <option value="training">Training</option>
  </select>
</FormField>

<FormField label="Representative Name" required>
  <input
    type="text"
    name="name"
    placeholder="e.g. John Doe"
    value={formData.name}
    onChange={handleInputChange}
    className={inputBase}
  />
</FormField>

<FormField label="Industry" required>
  <select
    name="industry"
    value={formData.industry}
    onChange={handleInputChange}
    className={selectBase}
  >
    <option value="">Select industry</option>
    <option value="Information & Technology">Information & Technology</option>
    <option value="Finance">Finance</option>
    <option value="Marketing">Marketing</option>
  </select>
</FormField>


      {/* Common Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Title" name="job_title" value={formData.job_title} onChange={update} />
<div className="md:col-span-2">
  <FormField label="Job Description" required>
    <textarea
      rows={5}
      name="description"
      value={formData.description}
      onChange={handleInputChange}
      placeholder="Describe the role, responsibilities, requirements..."
      className={textareaBase}
    />
  </FormField>
</div>

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
<FormField label="Job Title" required>
  <input
    type="text"
    name="job_title"
    placeholder="e.g. Senior Software Engineer"
    value={formData.job_title}
    onChange={handleInputChange}
    className={inputBase}
  />
</FormField>

<FormField label="Company Name" required>
  <input
    type="text"
    name="company_name"
    placeholder="e.g. Infosys"
    value={formData.company_name}
    onChange={handleInputChange}
    className={inputBase}
  />
</FormField>

<FormField label="Location" required>
  <input
    type="text"
    name="location"
    placeholder="e.g. Hyderabad"
    value={formData.location}
    onChange={handleInputChange}
    className={inputBase}
  />
</FormField>

<FormField label="Experience" required>
  <select
    name="experience"
    value={formData.experience}
    onChange={handleInputChange}
    className={selectBase}
  >
    <option value="">Select experience</option>
    <option value="0-1 years">0–1 years</option>
    <option value="1-3 years">1–3 years</option>
    <option value="3-5 years">3–5 years</option>
    <option value="5+ years">5+ years</option>
  </select>
</FormField>

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

<FormField label="Trainer Name" required>
  <input
    type="text"
    name="trainer_name"
    placeholder="e.g. John Doe"
    value={formData.trainer_name}
    onChange={handleInputChange}
    className={inputBase}
  />
</FormField>

            </Grid>
          </AnimatedSection>
        )}
      </AnimatePresence>

<FormField label="Company Type" required>
  <select
    name="company_type"
    value={formData.company_type}
    onChange={handleInputChange}
    className={selectBase}
  >
    <option value="">Select type</option>
    <option value="Startup">Startup</option>
    <option value="Indian MNC">Indian MNC</option>
    <option value="Foreign MNC">Foreign MNC</option>
  </select>
</FormField>

<FormField label="Company Register ID" required>
  <input
    type="text"
    name="register_number"
    placeholder="e.g. 1234567890"
    value={formData.register_number}
    onChange={handleInputChange}
    className={inputBase}
  />
</FormField>

      {/* Submit */}
<button
  type="submit"
  className="w-full mt-8 bg-purple-600 hover:bg-purple-700 
             text-white py-4 rounded-xl text-lg font-semibold
             transition-all"
>
  Post Job
</button>
    </form>
    </div>
  );
}

const inputBase =
  "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm \
   placeholder-gray-400 focus:outline-none focus:ring-2 \
   focus:ring-purple-300 focus:border-purple-400 bg-white";

const selectBase = inputBase;
const textareaBase = inputBase + " resize-none";


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
