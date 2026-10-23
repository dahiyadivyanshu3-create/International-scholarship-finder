import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `text-sm font-medium ${isActive ? "text-primary" : "text-slate-600 hover:text-primary"}`;

function NavLinks() {
  return (
    <>
      <NavLink to="/" end className={linkClass}>Home</NavLink>
      <NavLink to="/search" className={linkClass}>Scholarships</NavLink>
      <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
      <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary">Login</Link>
      <Link to="/register" className="rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-white hover:opacity-90">
        Sign Up
      </Link>
    </>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-base font-bold text-navy sm:text-lg">
          🎓 International Scholarship Finder
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          <NavLinks />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="text-2xl text-slate-700 md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="flex flex-col gap-4 border-t border-slate-200 px-4 py-4 md:hidden"
        >
          <NavLinks />
        </div>
      )}
    </nav>
  );
}