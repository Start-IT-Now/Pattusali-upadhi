// src/components/FilterSidebar.jsx
import React from "react";

const COMPANY_TYPES = ["Startup", "Foreign MNC", "Indian MNC", "Corporate", "Others"];
const LOCATIONS = ["Delhi NCR", "Bengaluru", "Ahmedabad", "Mumbai", "Hyderabad", "Chennai", "New Delhi"];
const INDUSTRIES = ["Financial Services", "Insurance", "Marketing", "Information & Technology"];

export default function FilterSidebar({ filters = {}, setFilters = () => {} }) {
  // helpers to update filters
  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const arr = Array.isArray(prev[key]) ? [...prev[key]] : [];
      const idx = arr.indexOf(value);
      if (idx === -1) arr.push(value);
      else arr.splice(idx, 1);
      return { ...prev, [key]: arr };
    });
  };

  const toggleLocation = (location) => {
    setFilters((prev) => ({ ...prev, location: prev.location === location ? null : location }));
  };

  const clearAll = () => {
    setFilters({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Filter Jobs</h4>
        <button type="button" onClick={clearAll} className="text-sm text-purple-600 hover:underline">
          Clear All
        </button>
      </div>

      {/* Company Type */}
      <div className="mb-4">
        <h5 className="text-sm font-medium mb-2">Company Type</h5>
        <div className="space-y-2">
          {COMPANY_TYPES.map((c) => {
            const checked = Array.isArray(filters.companyType) && filters.companyType.includes(c);
            return (
              <label key={c} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleArrayFilter("companyType", c)}
                  className="w-4 h-4 text-purple-600"
                />
                <span>{c}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Location */}
      <div className="mb-4">
        <h5 className="text-sm font-medium mb-2">Location</h5>
        <div className="space-y-2">
          {LOCATIONS.map((loc) => {
            const active = filters.location === loc;
            return (
              <button
                key={loc}
                onClick={() => toggleLocation(loc)}
                type="button"
                className={`w-full text-left px-3 py-2 rounded-md text-sm ${active ? "bg-purple-50 text-purple-700" : "hover:bg-gray-50"}`}
              >
                {loc}
              </button>
            );
          })}
        </div>
      </div>

      {/* Industry */}
      <div>
        <h5 className="text-sm font-medium mb-2">Industry</h5>
        <div className="space-y-2">
          {INDUSTRIES.map((ind) => {
            const checked = Array.isArray(filters.industry) && filters.industry.includes(ind);
            return (
              <label key={ind} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleArrayFilter("industry", ind)}
                  className="w-4 h-4 text-purple-600"
                />
                <span>{ind}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
