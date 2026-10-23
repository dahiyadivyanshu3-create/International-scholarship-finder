
import { Link } from "react-router-dom";
export default function ScholarshipCard({ s }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <img
  src={`https://flagcdn.com/w80/${s.code}.png`}
  alt={s.country}
  className="h-10 w-14 rounded object-cover shadow-sm"
/>
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900">{s.name}</h3>
        <p className="text-sm text-slate-500">
          {s.country} · <span className="text-green-600">{s.funding}</span>
        </p>
        <p className="mt-1 text-sm text-red-500">Deadline: {s.deadline}</p>
      </div>
      <Link
  to={`/scholarship/${s.id}`}
  className="rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white"
>
  View Details
</Link>
    </div>
  );
}