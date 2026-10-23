export default function FormSelect({ label, options, ...props }) {
  return (
    <label className="mb-4 block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        {...props}
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}