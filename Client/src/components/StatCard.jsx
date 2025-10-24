export default function StatCard({ title, value, trend, icon }) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-ink-500">{title}</p>
          <p className="heading text-2xl mt-1">{value}</p>
        </div>
        {icon && (
          <div className="h-12 w-12 rounded-xl grid place-items-center bg-brand-50 text-brand-700">{icon}</div>
        )}
      </div>
      {trend && (
        <p className="mt-3 text-sm">
          <span className={`font-medium ${trend.startsWith('+') ? 'text-success' : 'text-danger'}`}>{trend}</span>
          <span className="text-ink-500"> this month</span>
        </p>
      )}
    </div>
  );
}
