export default function SectionTabs({ tabs, active, onChange }) {
  return (
    <div className="inline-flex rounded-xl bg-ink-100 p-1">
      {tabs.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            active === t.value ? 'bg-white shadow-soft text-ink-900' : 'text-ink-600 hover:text-ink-800'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
