import { useState } from "react";
import { Link } from "react-router-dom";
import applications from "../data/applications";
import scholarships from "../data/scholarships";
import StatusBadge from "../components/StatusBadge";
import Flag from "../components/Flag";

const tabs = ["All", "In Progress", "Shortlisted", "Rejected"];

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric", timeZone: "UTC",
  });

export default function Applications() {
  const [tab, setTab] = useState("All");

  // har application ke saath uski scholarship ki details jod do
  const rows = applications
    .map((a) => ({ ...a, s: scholarships.find((s) => s.id === a.scholarshipId) }))
    .filter((r) => r.s);

  const count = (t) => (t === "All" ? rows.length : rows.filter((r) => r.status === t).length);
  const visible = tab === "All" ? rows : rows.filter((r) => r.status === tab);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">My Applications</h1>
      <p className="mt-1 text-sm text-slate-500">Track the status of your scholarship applications.</p>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              tab === t ? "bg-primary text-white" : "bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t} ({count(t)})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Scholarship</th>
              <th className="px-4 py-3 font-medium">Country</th>
              <th className="px-4 py-3 font-medium">Applied On</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr key={r.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Flag code={r.s.code} country={r.s.country} className="h-6 w-9 rounded shadow-sm" />
                    <span className="font-medium text-slate-900">{r.s.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{r.s.country}</td>
                <td className="px-4 py-3 text-slate-600">{formatDate(r.appliedOn)}</td>
                <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                <td className="px-4 py-3">
                  <Link
                    to={`/scholarship/${r.s.id}`}
                    className="rounded-lg border border-primary px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-white"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visible.length === 0 && (
          <p className="p-6 text-center text-sm text-slate-500">No applications in this category.</p>
        )}
      </div>
    </div>
  );
}