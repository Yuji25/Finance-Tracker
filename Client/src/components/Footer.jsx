export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-ink-600 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} FinTrack. All rights reserved.</p>
        <p className="text-ink-500">Built with React, Vite, Tailwind, and love.</p>
      </div>
    </footer>
  );
}
