import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Dark overlay (sirf mobile par, menu khula ho tab) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}

      <div className="min-w-0 flex-1">
        {/* Mobile top bar */}
        <header className="flex items-center gap-3 border-b border-slate-200 bg-white p-4 md:hidden">
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="text-2xl">☰</button>
          <span className="text-sm font-bold text-navy">International Scholarship Finder</span>
        </header>

        <main className="p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}