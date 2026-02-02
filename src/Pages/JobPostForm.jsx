import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Plus, X } from "lucide-react";
import supabase from "../lib/supabase";

const inputBase =
  "w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 outline-none";

export default function JobPostForm({ onJobPosted = () => {}, onCancel = () => {} }) {
  const reviewToken = crypto.randomUUID();
  const [formData, setFormData] = useState({
    service_type: "job",
    job_title: "",
    company_name: "",
    location: "",
    experience:"",
    job_type:"",
    hr_name:"",
    hr_email: "",
    work_mode:" ",
    industry: "",
    company_type: "",

    guidance_type:"",
    guidance_slot:"",
    guidance_period:"",
    mentor_name: "",
    mentor_email:"",
    guidance_mode:"",

    training_type: "",
    training_mode: "",
    trainer_name: "",
    training_duration:"",
    training_topic:"",
    training_certification:"",

    description: "",
    end_date: "",
    status:"pending",
    review_token: reviewToken
  });

    const [otherInputs, setOtherInputs] = useState({
  company_type: "",
  industry: "",
  job_type: "",
});

 const buildPayload = (formData, serviceType) => {
  const clean = (v) => (v && v.trim() ? v : null);

  const base = {
    service_type: serviceType,
    job_title: formData.job_title,
    phone: formData.phone,
    name: formData.name,
    email: formData.email,
    description: clean(formData.description),
    end_date: formData.end_date || null,
    status: "pending",
    review_token: formData.review_token,
  };

  if (serviceType === "job") {
    return {
      ...base,
      company_name: clean(formData.company_name),
      location: clean(formData.location),
      experience: clean(formData.experience),
              company_type:
          formData.company_type === "Others"
            ? clean(otherInputs.company_type)
            : clean(formData.company_type),

        industry:
          formData.industry === "Others"
            ? clean(otherInputs.industry)
            : clean(formData.industry),

        job_type:
          formData.job_type === "Others"
            ? clean(otherInputs.job_type)
            : clean(formData.job_type),
      work_mode: clean(formData.work_mode),
      hr_name: clean(formData.hr_name),
      hr_email: clean(formData.hr_email),
      skills,
    };
  }

  if (serviceType === "guidance") {
    return {
      ...base,
      guidance_type: clean(formData.guidance_type),
      guidance_slot: clean(formData.guidance_slot),
      guidance_period: clean(formData.guidance_period),
      guidance_mode: clean(formData.guidance_mode),
      mentor_name: clean(formData.mentor_name),
      mentor_email: clean(formData.mentor_email),
    };
  }

  if (serviceType === "training") {
    return {
      ...base,
      training_type: clean(formData.training_type),
      training_mode: clean(formData.training_mode),
      training_duration: clean(formData.training_duration),
      training_topic: clean(formData.training_topic),
      training_certification: clean(formData.training_certification),
      trainer_name: clean(formData.trainer_name),
    };
  }


  // ✅ SAFETY FALLBACK
  return base;
};



  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(false);

  /* ✅ SINGLE INPUT HANDLER */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

      // ✅ if not Others then clear textbox value
  if (value !== "Others") {
    setOtherInputs((prev) => ({ ...prev, [name]: "" }));
  }
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

  const payload = buildPayload(formData, formData.service_type);

  if (!payload) {
    setLoading(false);
    return;
  }

  const { error } = await supabase.from("jobs").insert([payload]);

  if (!error) {
    await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-job-alert`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      }
    );

    // ✅ Alert message after submit
    alert(
      "✅ Your post has been submitted successfully!\nIt will be reviewed and published within 24 hours."
    );
  }

  setLoading(false);

  if (error) {
    console.error(error);
    alert("❌ Failed to submit. Please try again.");
    return;
  }

  onJobPosted?.();
  onCancel?.();
};

const SelectWithOthers = ({ label, name, value, options, required = false }) => (
  <div>
    <label className="font-semibold">{label}</label>

    <select
      name={name}
      value={value || ""}
      onChange={handleInputChange}
      className={inputBase}
      required={required}
    >
      <option value="">Select {label}</option>

      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}

      <option value="Others">Others</option>
    </select>

    {/* ✅ Show textbox when Others */}
    {value === "Others" && (
      <input
        type="text"
        value={otherInputs[name] || ""}
        onChange={(e) =>
          setOtherInputs((prev) => ({ ...prev, [name]: e.target.value }))
        }
        placeholder={`Enter ${label}`}
        className={`${inputBase} mt-2`}
        required
      />
    )}
  </div>
);


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

     <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold">Representative Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={inputBase}
          />
        </div>

        <div>
          <label className="font-semibold">Representative Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={inputBase}
          />
        </div>
        </div>
 
<div className="grid md:grid-cols-2 gap-6">
<div>
  <label className="font-semibold">
    Application End Date
    <span className="text-gray-400 text-sm ml-1">(optional)</span>
  </label>

  <input
    type="date"
    name="end_date"
    value={formData.end_date || ""}
    onChange={handleInputChange}
    className={inputBase}
    min={new Date().toISOString().split("T")[0]} 
  />

  <p className="text-xs text-gray-500 mt-1">
    Leave empty if the application has no deadline.
  </p>
</div>
               <div>
          <label className="font-semibold">Phone</label>
          <input
            name="phone"
            value={formData.phone}
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
              <label className="font-semibold">Experience (Years)</label>
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

<SelectWithOthers
  label="Company Type"
  name="company_type"
  value={formData.company_type}
  required
  options={["Foreign MNC", "Startup", "Indian MNC", "Corporate"]}
/>


<SelectWithOthers
  label="Industry"
  name="industry"
  value={formData.industry}
  required
  options={[
    "Agriculture",
    "Education",
    "Financial Services",
    "Hardware & Networking",
    "Information & Technology",
    "Insurance",
    "Marketing",
  ]}
/>



<div>
  <label className="font-semibold">Work Mode</label>
  <select
    name="work_mode"
    value={formData.work_mode || ""}
    onChange={handleInputChange}
    className={inputBase}
    required
  >
    <option value="">Select workmode</option>
    <option value="Work from Office">Work from office</option>
    <option value="Work from Home">Work from home</option>
    <option value="Remote">Remote</option>
    <option value="Hybrid">Hybrid</option>
  </select>
</div>

<SelectWithOthers
  label="Job Type"
  name="job_type"
  value={formData.job_type}
  required
  options={["Full-time", "Part-time", "Contract", "Freelance", "Internship"]}
/>


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
          <option value="free"> Free</option>
          <option value="paid">Paid</option>
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
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
          <option value="night">Night</option>
        </select>
      </div>

       <div>
        <label className="font-semibold">Guidance Mode</label>
        <select
          name="guidance_mode"
          value={formData.guidance_mode}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="online"> Online </option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
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
              name="mentor_email"
              value={formData.mentor_email}
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
          name="training_type"
          value={formData.training_type}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="paid">Paid</option>
          <option value="free">Free</option>
        </select>
            </div>

          <div>
         <label className="font-semibold">Training Mode</label>
        <select
          name="training_mode"
          value={formData.training_mode}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
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
              name="training_duration"
              value={formData.training_duration}
              onChange={handleInputChange}
              className={inputBase}
            />
            </div>

                     <div>
         <label className="font-semibold">Certification</label>
        <select
          name="training_certification"
          value={formData.training_certification}
          onChange={handleInputChange}
          className={inputBase}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="maybe">Maybe</option>
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
