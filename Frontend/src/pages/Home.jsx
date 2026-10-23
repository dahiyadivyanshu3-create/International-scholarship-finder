import { useState } from "react";
import { useNavigate } from "react-router-dom";
import scholarships from "../data/scholarships";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const countryCount = new Set(scholarships.map((s) => s.country)).size;

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-blue-900 px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Your Global Education Journey Starts Here
          </h1>
          <p className="mt-4 max-w-xl text-blue-100">
            Discover scholarships from top universities around the world.
            Turn your dreams into opportunities, for free.
          </p>

          <form onSubmit={handleSearch} className="mt-8 flex max-w-2xl overflow-hidden rounded-full bg-white p-1.5">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by scholarship name or country..."
              className="flex-1 bg-transparent px-4 text-sm text-slate-800 outline-none"
            />
            <button className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:opacity-90">
              Search
            </button>
          </form>

        <div className="mt-10 flex flex-wrap gap-6 text-sm sm:gap-10">
            <div>
              <p className="text-2xl font-bold">{scholarships.length}</p>
              <p className="text-blue-200">Scholarships</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{countryCount}</p>
              <p className="text-blue-200">Countries</p>
            </div>
            <div>
              <p className="text-2xl font-bold">100%</p>
              <p className="text-blue-200">Free to Use</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-surface px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-slate-900">Why use this platform?</h2>
        <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { title: "Centralized search", text: "Scholarships from many countries in one place." },
            { title: "Smart filters", text: "Filter by country, degree level and funding type." },
            { title: "Never miss a deadline", text: "Save scholarships and track their deadlines." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}