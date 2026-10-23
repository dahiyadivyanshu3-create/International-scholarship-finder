import { NavLink, useNavigate } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/search", label: "Search Scholarships" },
  { to: "/profile", label: "My Profile" },
  { to: "/saved", label: "Saved Scholarships" },
  { to: "/applications", label: "Applications" },
  { to: "/notifications", label: "Notifications" },
];

const linkClass = ({ isActive }) =>
  `block rounded-lg px-4 py-2.5 text-sm font-medium ${
    isActive ? "bg-primary text-white" : "text-slate-300 hover:bg-white/10"
  }`;

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-60 shrink-0 flex-col bg-navy p-4 transition-transform md:static md:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <p className="mb-8 px-2 text-sm font-bold text-white">🎓 International Scholarship Finder</p>

      <nav className="flex-1 space-y-1">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className={linkClass} onClick={onClose}>
            {l.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => navigate("/login")}
        className="rounded-lg px-4 py-2.5 text-left text-sm font-medium text-slate-300 hover:bg-white/10"
      >
        Logout
      </button>
    </aside>
  );
}