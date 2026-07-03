import { useState } from 'react';
import { LogOut, Wrench, Megaphone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AddProblemForm from './AddProblemForm';
import ManageProblems from './ManageProblems';
import ManageAnnouncements from './ManageAnnouncements';

const TABS = [
  { id: 'problems', label: 'Troubleshooting Entries', icon: Wrench },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
];

export default function AdminDashboard() {
  const { currentUser, logout } = useAuth();
  const [tab, setTab] = useState('problems');

  return (
    <div className="min-h-[80vh] bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-display text-xl font-semibold text-hub-900">
              Admin Dashboard
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Signed in as {currentUser?.email}
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-7 flex gap-2 border-b border-slate-200">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                  active
                    ? 'border-hub-teal text-hub-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {tab === 'problems' ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AddProblemForm />
            <ManageProblems />
          </div>
        ) : (
          <ManageAnnouncements />
        )}
      </div>
    </div>
  );
}
