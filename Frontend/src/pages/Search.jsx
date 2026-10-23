import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import scholarships from "../data/scholarships";
import ScholarshipCard from "../components/ScholarshipCard";

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();

  const [country, setCountry] = useState("");
  const [levels, setLevels] = useState([]);
  const [types, setTypes] = useState([]);

  const countries = [...new Set(scholarships.map((s) => s.country))];

  const toggle = (setter) => (value) =>
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  const toggleLevel = toggle(setLevels);
  const toggleType = toggle(setTypes);

  const clearAll = () => {
    setCountry("");
    setLevels([]);
    setTypes([]);
  };

  const results = scholarships.filter(
    (s) =>
      (!q || s.name.toLowerCase().includes(q) || s.country.toLowerCase().includes(q)) &&
      (!country || s.country === country) &&
      (levels.length === 0 || levels.some((l) => s.levels.includes(l))) &&
      (types.length === 0 || types.includes(s.funding))
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-surface">
      {/* Filters */}
      <aside className="w-64 border-r border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Filters</h2>
          <button onClick={clearAll} className="text-xs text-primary hover:underline">
            Clear All
          </button>
        </div>

        <label className="text-sm font-medium">Country</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="mt-1 mb-5 w-full rounded-lg border border-slate-300 p-2 text-sm"
        >
          <option value="">All countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <p className="text-sm font-medium">Degree Level</p>
        {["Undergraduate", "Masters", "PhD"].map((level) => (
          <label key={level} className="mt-2 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={levels.includes(level)} onChange={() => toggleLevel(level)} />
            {level}
          </label>
        ))}

        <p className="mt-5 text-sm font-medium">Scholarship Type</p>
        {["Fully Funded", "Partial Funded"].map((type) => (
          <label key={type} className="mt-2 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={types.includes(type)} onChange={() => toggleType(type)} />
            {type}
          </label>
        ))}
      </aside>

      {/* Results */}
      <main className="flex-1 p-6">
        <p className="mb-4 text-sm text-slate-600">
          {results.length} scholarships found{q && ` for "${params.get("q")}"`}
        </p>
        <div className="space-y-4">
          {results.map((s) => (
            <ScholarshipCard key={s.id} s={s} />
          ))}
        </div>
      </main>
    </div>
  );
}