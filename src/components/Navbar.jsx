import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { TerminalSquare, Menu, X, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkBase =
    'text-sm font-medium text-hub-500 transition hover:text-slate-100';
  const linkActive = 'text-slate-100';

  return (
    <header className="sticky top-0 z-40 border-b border-hub-700 bg-hub-900/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <TerminalSquare className="h-6 w-6 text-hub-teal" strokeWidth={2} />
          <span className="font-display text-lg font-semibold tracking-tight text-slate-50">
            Computer Problem Hub
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <NavLink
              key={cat.id}
              to={`/category/${cat.id}`}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ''}`
              }
            >
              {cat.name}
            </NavLink>
          ))}
          <Link
            to="/admin"
            className="flex items-center gap-1.5 rounded-md border border-hub-700 px-3.5 py-2 text-sm font-medium text-hub-500 transition hover:border-hub-teal hover:text-hub-teal"
          >
            <ShieldCheck className="h-4 w-4" />
            Admin
          </Link>
        </nav>

        <button
          className="text-slate-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-hub-700 bg-hub-900 px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {CATEGORIES.map((cat) => (
              <NavLink
                key={cat.id}
                to={`/category/${cat.id}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-hub-500 transition hover:bg-hub-800 hover:text-slate-100"
              >
                {cat.name}
              </NavLink>
            ))}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center gap-1.5 rounded-md border border-hub-700 px-3 py-2.5 text-sm font-medium text-hub-500 hover:text-hub-teal"
            >
              <ShieldCheck className="h-4 w-4" />
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
