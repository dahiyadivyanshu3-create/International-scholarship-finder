export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-white">
      <div className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 mb-6 text-sm text-slate-500">{subtitle}</p>
          {children}
        </div>
      </div>

      <div className="hidden flex-1 items-center justify-center bg-gradient-to-br from-navy to-blue-900 p-10 lg:flex">
        <h2 className="max-w-xs text-4xl font-bold leading-tight text-white">
          Better Opportunities. A Brighter Future.
        </h2>
      </div>
    </div>
  );
}