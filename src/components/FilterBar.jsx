import React from "react";

/* ---------- JOB FILTER DATA ---------- */
const COMPANY_TYPES = ["Startup", "Foreign MNC", "Indian MNC", "Corporate", "Others"];
const LOCATIONS = ["Delhi NCR", "Bengaluru", "Ahmedabad", "Mumbai", "Hyderabad", "Chennai", "Pune", "Kolkata"];
const INDUSTRIES = ["Financial Services", "Insurance", "Marketing", "Information & Technology", "Hardware & Networking"];

/* ---------- GUIDANCE FILTER DATA ---------- */
const GUIDANCE_MODES = ["Online", "Offline"];
const GUIDANCE_SLOTS = ["Morning", "Afternoon", "Evening"];

/* ---------- TRAINING FILTER DATA ---------- */
const TRAINING_DURATIONS = ["1 Week", "1 Month", "3 Months", "6 Months"];
const CERTIFICATION = ["Yes", "No"];

export default function FilterSidebar({
  servicetype = "job",
  filters = {},
  setFilters = () => {},
}) {
  /* ---------- HELPERS ---------- */

  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const arr = Array.isArray(prev[key]) ? [...prev[key]] : [];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const updateValue = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAll = () => setFilters({});

  return (
    <div className="bg-white rounded-2xl shadow-md border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold capitalize">
          Filter {servicetype}
        </h4>
        <button
          type="button"
          onClick={clearAll}
          className="text-sm text-purple-600 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* ================= JOB FILTERS ================= */}
      {servicetype === "job" && (
        <>
          <Section title="Company Type">
            {COMPANY_TYPES.map((c) => (
              <Checkbox
                key={c}
                label={c}
                checked={filters.companyType?.includes(c)}
                onChange={() => toggleArrayFilter("companyType", c)}
              />
            ))}
          </Section>

          <Section title="Location">
            {LOCATIONS.map((loc) => (
              <Checkbox
                key={loc}
                label={loc}
                checked={filters.location?.includes(loc)}
                onChange={() => toggleArrayFilter("location", loc)}
              />
            ))}
          </Section>

          <Section title="Industry">
            {INDUSTRIES.map((ind) => (
              <Checkbox
                key={ind}
                label={ind}
                checked={filters.industry?.includes(ind)}
                onChange={() => toggleArrayFilter("industry", ind)}
              />
            ))}
          </Section>
        </>
      )}

      {/* ================= GUIDANCE FILTERS ================= */}
      {servicetype === "guidance" && (
        <>
          <Input
            label="Mentor Name"
            value={filters.mentor || ""}
            onChange={(v) => updateValue("mentor", v)}
          />

          <Section title="Session Mode">
            {GUIDANCE_MODES.map((m) => (
              <Checkbox
                key={m}
                label={m}
                checked={filters.mode?.includes(m)}
                onChange={() => toggleArrayFilter("mode", m)}
              />
            ))}
          </Section>

          <Section title="Time Slot">
            {GUIDANCE_SLOTS.map((s) => (
              <Checkbox
                key={s}
                label={s}
                checked={filters.slot?.includes(s)}
                onChange={() => toggleArrayFilter("slot", s)}
              />
            ))}
          </Section>
        </>
      )}

      {/* ================= TRAINING FILTERS ================= */}
      {servicetype === "training" && (
        <>
          <Input
            label="Training Topic"
            value={filters.topic || ""}
            onChange={(v) => updateValue("topic", v)}
          />

          <Section title="Duration">
            {TRAINING_DURATIONS.map((d) => (
              <Checkbox
                key={d}
                label={d}
                checked={filters.duration?.includes(d)}
                onChange={() => toggleArrayFilter("duration", d)}
              />
            ))}
          </Section>

          <Section title="Certification">
            {CERTIFICATION.map((c) => (
              <Checkbox
                key={c}
                label={c}
                checked={filters.certification?.includes(c)}
                onChange={() => toggleArrayFilter("certification", c)}
              />
            ))}
          </Section>
        </>
      )}
    </div>
  );
}

/* ---------- SMALL REUSABLE UI ---------- */

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <h5 className="text-sm font-medium mb-2">{title}</h5>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={onChange}
        className="w-4 h-4 text-purple-600"
      />
      <span>{label}</span>
    </label>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <h5 className="text-sm font-medium mb-2">{label}</h5>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Search ${label.toLowerCase()}`}
        className="w-full border rounded-lg px-3 py-2 text-sm"
      />
    </div>
  );
}
