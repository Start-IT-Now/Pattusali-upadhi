// src/components/FilterSidebar.jsx
import React from "react";

export default function FilterSidebar({ filters = {}, setFilters = () => {} }) {
  const locations = [
    "Delhi NCR",
    "Bengaluru",
    "Ahmedabad",
    "Mumbai",
    "Hyderabad",
    "Chennai",
    "New Delhi",
  ];
  const industries = [
    "Financial Services",
    "Insurance",
    "Marketing",
    "Information & Technology",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">Filter Jobs</h4>
        <button
          type="button"
          className="text-sm text-purple-600"
          onClick={() => setFilters({})}
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-medium mb-2">Company Type</h5>
          <div className="space-y-2">
            {["Startup", "Foreign MNC", "Indian MNC", "Corporate", "Others"].map(
              (c) => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="w-4 h-4 text-purple-600" />
                  <span>{c}</span>
                </label>
              )
            )}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2">Location</h5>
          <div className="space-y-2">
            {locations.map((loc) => (
              <label key={loc} className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4 text-purple-600" />
                <span>{loc}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium mb-2">Industry</h5>
          <div className="space-y-2">
            {industries.map((ind) => (
              <label key={ind} className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4 text-purple-600" />
                <span>{ind}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
