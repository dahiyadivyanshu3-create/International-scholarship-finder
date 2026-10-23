import { useState } from "react";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import scholarships from "../data/scholarships";

const emptyProfile = {
  name: "", email: "", country: "",
  educationLevel: "", degree: "", field: "", cgpa: "", gradYear: "",
  targetLevel: "", preferredCountry: "",
};

const sections = [
  { title: "Personal Details", fields: ["name", "email", "country"] },
  { title: "Academic Details", fields: ["educationLevel", "degree", "field", "cgpa", "gradYear"] },
  { title: "Preferences", fields: ["targetLevel", "preferredCountry"] },
];

function loadProfile() {
  try {
    return { ...emptyProfile, ...JSON.parse(localStorage.getItem("profile")) };
  } catch {
    return emptyProfile;
  }
}

export default function Profile() {
  const [form, setForm] = useState(loadProfile);
  const [saved, setSaved] = useState(false);

  const countries = [...new Set(scholarships.map((s) => s.country))];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("profile", JSON.stringify(form)); // baad mein yahan PUT /profile API aayegi
    } catch {
      /* storage na chale to bhi app crash na ho */
    }
    setSaved(true);
  };

  // Progress: kitne fields bhare hain
  const allFields = sections.flatMap((s) => s.fields);
  const filled = allFields.filter((f) => String(form[f]).trim() !== "").length;
  const percent = Math.round((filled / allFields.length) * 100);

  const card = "rounded-xl border border-slate-200 bg-white p-5 shadow-sm";

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Profile Settings</h1>
      <p className="mt-1 text-sm text-slate-500">
        Jitni complete profile hogi, utni sahi recommendations milengi.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
          {/* Header */}
          <div className={`${card} flex items-center gap-4`}>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy text-xl font-bold text-white">
              {form.name ? form.name[0].toUpperCase() : "?"}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{form.name || "Your Name"}</p>
              <p className="text-sm text-slate-500">{form.email || "your@email.com"}</p>
            </div>
          </div>

          {/* Personal */}
          <div className={card}>
            <h2 className="mb-4 font-semibold text-slate-900">Personal Information</h2>
            <div className="grid gap-x-4 sm:grid-cols-2">
              <FormInput label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
              <FormInput label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
              <FormInput label="Country (your nationality)" name="country" value={form.country} onChange={handleChange} placeholder="e.g. India" />
            </div>
          </div>

          {/* Academic */}
          <div className={card}>
            <h2 className="mb-4 font-semibold text-slate-900">Academic Details</h2>
            <div className="grid gap-x-4 sm:grid-cols-2">
              <FormSelect label="Current Education Level" name="educationLevel" value={form.educationLevel}
                onChange={handleChange} options={["Undergraduate", "Masters", "PhD"]} />
              <FormInput label="Current Degree" name="degree" value={form.degree} onChange={handleChange} placeholder="e.g. B.Tech" />
              <FormInput label="Field of Study" name="field" value={form.field} onChange={handleChange} placeholder="e.g. Computer Science" />
              <FormInput label="CGPA (out of 10)" type="number" step="0.01" min="0" max="10" name="cgpa"
                value={form.cgpa} onChange={handleChange} placeholder="e.g. 7.2" />
              <FormInput label="Graduation Year" type="number" min="2000" max="2040" name="gradYear"
                value={form.gradYear} onChange={handleChange} placeholder="e.g. 2027" />
            </div>
          </div>

          {/* Preferences */}
          <div className={card}>
            <h2 className="mb-4 font-semibold text-slate-900">Preferences</h2>
            <div className="grid gap-x-4 sm:grid-cols-2">
              <FormSelect label="Scholarship Level You Want" name="targetLevel" value={form.targetLevel}
                onChange={handleChange} options={["Undergraduate", "Masters", "PhD"]} />
              <FormSelect label="Preferred Country" name="preferredCountry" value={form.preferredCountry}
                onChange={handleChange} options={countries} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:opacity-90">
              Save Profile
            </button>
            {saved && <span className="text-sm text-green-600">Profile saved ✓</span>}
          </div>
        </form>

        {/* Progress */}
        <aside className={`${card} h-fit`}>
          <h2 className="font-semibold text-slate-900">Profile Progress</h2>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-1 text-right text-xs text-slate-500">{percent}%</p>

          <ul className="mt-4 space-y-3">
            {sections.map((s) => {
              const done = s.fields.filter((f) => String(form[f]).trim() !== "").length;
              const complete = done === s.fields.length;
              return (
                <li key={s.title} className="flex items-center justify-between text-sm">
                  <span className={complete ? "text-slate-900" : "text-slate-500"}>
                    {complete ? "✅" : "⭕"} {s.title}
                  </span>
                  <span className="text-xs text-slate-400">{done}/{s.fields.length}</span>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}