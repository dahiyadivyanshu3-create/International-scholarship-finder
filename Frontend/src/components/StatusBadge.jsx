const styles = {
  "In Progress": "bg-blue-100 text-blue-700",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}