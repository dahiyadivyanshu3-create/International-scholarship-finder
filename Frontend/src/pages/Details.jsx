import { Link, useParams } from "react-router-dom";
import scholarships from "../data/scholarships";
import Flag from "../components/Flag";

export default function Details() {
  const { id } = useParams();
  const s = scholarships.find((item) => item.id === Number(id));

  if (!s) return <p className="p-6">Scholarship not found.</p>;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-surface p-6">
      <Link to="/search" className="text-sm text-primary">← Back to search</Link>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
         <Flag code={s.code} country={s.country} className="h-10 w-14 rounded shadow-sm" />
          <div>
            <h1 className="text-xl font-bold text-slate-900">{s.name}</h1>
            <p className="text-sm text-slate-500">
              {s.country} · <span className="text-green-600">{s.funding}</span>
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-2 text-sm text-slate-700">
          <p><b>Degree Level:</b> {s.levels.join(", ")}</p>
          <p><b>Deadline:</b> {s.deadline}</p>
        </div>

        <button className="mt-6 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white">Apply Now</button>
      </div>
    </div>
  );
}