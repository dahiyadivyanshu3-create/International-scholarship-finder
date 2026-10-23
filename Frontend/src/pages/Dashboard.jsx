import { Link } from "react-router-dom";
import scholarships from "../data/scholarships";
import Flag from "../components/Flag";

const user = { name: "Divyanshu" }; 

export default function Dashboard() {
  const today = new Date();
  const in60Days = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);

  const deadlinesSoon = scholarships.filter((s) => {
    const d = new Date(s.deadline);
    return d >= today && d <= in60Days;
  }).length;

  
  const stats = [
    { label: "Matching Scholarships", value: scholarships.length },
    { label: "Saved Scholarships", value: 0 },
    { label: "Applied", value: 0 },
    { label: "Deadlines Soon", value: deadlinesSoon },
  ];

  const actions = [
    { to: "/profile", label: "Update Profile" },
    { to: "/search", label: "Search Scholarships" },
    { to: "/applications", label: "Track Applications" },
    { to: "/notifications", label: "View Notifications" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Good Morning, {user.name}! 👋</h1>
      <p className="mt-1 text-sm text-slate-500">Here's your personalized scholarship overview.</p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-3xl font-bold text-primary">{s.value}</p>
            <p className="mt-1 text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recommended */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-semibold text-slate-900">Recommended for You</h2>
        <Link to="/search" className="text-sm text-primary">View all →</Link>
      </div>
      <div className="mt-3 grid gap-4 md:grid-cols-3">
        {scholarships.slice(0, 3).map((s) => (
          <div key={s.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <Flag code={s.code} country={s.country} className="h-8 w-12 rounded shadow-sm" />
            <h3 className="mt-3 text-sm font-semibold text-slate-900">{s.name}</h3>
            <p className="text-xs text-slate-500">{s.country} · <span className="text-green-600">{s.funding}</span></p>
            <p className="mt-1 text-xs text-red-500">Deadline: {s.deadline}</p>
            <Link to={`/scholarship/${s.id}`}
              className="mt-3 block rounded-lg bg-primary py-2 text-center text-xs font-medium text-white">
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="mt-8 font-semibold text-slate-900">Quick Actions</h2>
      <div className="mt-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {actions.map((a) => (
          <Link key={a.to} to={a.to}
            className="rounded-xl border border-slate-200 bg-white p-4 text-center text-sm font-medium text-slate-700 shadow-sm hover:border-primary hover:text-primary">
            {a.label}
          </Link>
        ))}
      </div>
    </div>
  );
}