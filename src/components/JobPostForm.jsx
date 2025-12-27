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
    job_type:" ",
    hr_name:" ",
    hr_email: "",
    work_mode:" ",
    industry: "",
    company_type: "",

    guidance_type: "",
    guidance_slot:" ",
    guidance_period:" ",
    mentor_name: "",
    mentor_mail:" ",
    guidance_mode:" ",

    training_type: "",
    training_mode: "",
    trainer_name: "",
    training_duration:" ",
    training_topic:" ",
    training_certification:" ",

    description: "",
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
              <label className="font-semibold">Company Name</label>
              <input
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                className={inputBase}
              />
            </div>

               <div>
              <label className="font-semibold">HR Name</label>
              <input
                name="hr_name"
                value={formData.hr_name}
                onChange={handleInputChange}
                className={inputBase}
              />
            </div>

            <div>
              <label className="font-semibold">HR Email</label>
              <input
                name="hr_email"
                value={formData.hr_email}
                onChange={handleInputChange}
                className={inputBase}
              />
            </div>

                  <div>
        <label className="font-semibold">Company Type</label>
        <select
          name="company_type"
          value={formData.company_type}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="job"> Foreign MNC</option>
          <option value="guidance">Startup</option>
          <option value="training">Indian MNC</option>
          <option value="training">Corporate</option>
          <option value="training">Others</option>
        </select>
      </div>

            <div>
        <label className="font-semibold">Industry</label>
        <select
          name="industry"
          value={formData.industry}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="job">Information Technology</option>
          <option value="guidance">Financial Services</option>
          <option value="training">Marketing</option>
          <option value="job">Insurance</option>
          <option value="guidance">Hardware & Networking</option>
          <option value="training">Others</option>
        </select>
      </div>

       <div>
        <label className="font-semibold">Work Mode</label>
        <select
          name="work_mode"
          value={formData.work_mode}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="job"> Onsite </option>
          <option value="guidance">Work from Home</option>
          <option value="training"> Remote </option>
          <option value="training">Hybrid</option>
        </select>
      </div>

       <div>
        <label className="font-semibold">Job Type</label>
        <select
          name="job_type"
          value={formData.job_type_type}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="job"> Full-Time</option>
          <option value="guidance">Part-Time</option>
          <option value="training">Paid Internship</option>
          <option value="training">Contract</option>
          <option value="training">Others</option>
        </select>
      </div>

          </motion.div>
        )}

        {formData.service_type === "guidance" && (
          <motion.div
            key="guidance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 gap-6"
          >
         <div>
        <label className="font-semibold">Guidance Type</label>
        <select
          name="guidance_type"
          value={formData.guidance_type}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="job"> Free</option>
          <option value="guidance">Paid</option>
        </select>
      </div>

            <div>
        <label className="font-semibold">Guidance Slot</label>
        <select
          name="guidance_slot"
          value={formData.guidance_slot}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="job">Morning</option>
          <option value="guidance">Afternoon</option>
          <option value="training">Evening</option>
          <option value="job">Night</option>
        </select>
      </div>

       <div>
        <label className="font-semibold">Guidance Mode</label>
        <select
          name="guidance_mode"
          value={formData.guidance_mode_mode}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="job"> Online </option>
          <option value="guidance">Offline</option>
          <option value="training">Hybrid</option>
        </select>
      </div>

            <div>
            <label className="font-semibold">Period</label>
            <input
              name="guidance_period"
              value={formData.guidance_period}
              onChange={handleInputChange}
              className={inputBase}
            />
            </div>

            <div>
            <label className="font-semibold">Mentor Name</label>
            <input
              name="mentor_name"
              value={formData.mentor_name}
              onChange={handleInputChange}
              className={inputBase}
            />
            </div>

            <div>
            <label className="font-semibold">Mentor Mail</label>
            <input
              name="mentor_mail"
              value={formData.mentor_mail}
              onChange={handleInputChange}
              className={inputBase}
            />
            </div>
          </motion.div>
        )}

        {formData.service_type === "training" && (
          <motion.div
            key="training"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 gap-6"
          >

            <div>
         <label className="font-semibold">Training Type</label>
        <select
          name="Training_type"
          value={formData.training_type}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="job">Paid</option>
          <option value="guidance">Free</option>
        </select>
            </div>

          <div>
         <label className="font-semibold">Training Mode</label>
        <select
          name="Trainging_mode"
          value={formData.training_mode}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="job">Online</option>
          <option value="guidance">Offline</option>
          <option value="guidance">Hybrid</option>
        </select>
            </div>

                       <div>
            <label className="font-semibold">Trainer Name</label>
            <input
              name="trainer_name"
              value={formData.trainer_name}
              onChange={handleInputChange}
              className={inputBase}
            />
            </div>

            <div>
            <label className="font-semibold">Training Duration</label>
            <input
              name="trainer_duration"
              value={formData.training_duration}
              onChange={handleInputChange}
              className={inputBase}
            />
            </div>

                     <div>
         <label className="font-semibold">Certification</label>
        <select
          name="certification"
          value={formData.training_certification}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="job">Yes</option>
          <option value="guidance">No</option>
          <option value="guidance">Maybe</option>
        </select>
            </div>
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
