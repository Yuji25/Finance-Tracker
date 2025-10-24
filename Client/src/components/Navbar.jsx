import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthed = Boolean(localStorage.getItem('token'));

  const links = useMemo(() => ([
    { to: '/', label: 'Home', show: true },
    { to: '/dashboard', label: 'Dashboard', show: isAuthed },
    { to: '/transactions', label: 'Transactions', show: isAuthed },
  ]), [isAuthed]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-ink-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand-600 text-white grid place-items-center font-bold">₹</div>
          <span className="heading text-xl">FinTrack</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.filter(l => l.show).map(l => (
            <Link key={l.to} to={l.to} className={`text-sm font-medium hover:text-brand-700 ${location.pathname === l.to ? 'text-brand-700' : 'text-ink-600'}`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {!isAuthed ? (
            <Link to="/auth" className="btn-primary text-sm">Login / Sign up</Link>
          ) : (
            <>
              <Link to="/transactions" className="btn-ghost text-sm">Add Transaction</Link>
              <button className="btn-secondary text-sm" onClick={logout}>Logout</button>
            </>
          )}
          <button className="md:hidden btn-ghost p-2" aria-label="menu">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
