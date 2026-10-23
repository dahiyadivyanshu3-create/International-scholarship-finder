import * as Flags from "country-flag-icons/react/3x2";

export default function Flag({ code, country, className }) {
  const Icon = Flags[code.toUpperCase()];
  if (!Icon) return <span className="text-xs text-slate-500">{country}</span>;
  return <Icon title={country} className={className} />;
}