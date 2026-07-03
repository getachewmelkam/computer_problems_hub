import { useEffect, useState } from 'react';
import { Trash2, ListTree } from 'lucide-react';
import Loader from '../../components/Loader';
import { fetchAllProblems, deleteProblem } from '../../utils/firestore';
import { getCategoryByName } from '../../data/categories';

export default function ManageProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    fetchAllProblems()
      .then(setProblems)
      .catch((err) => console.error('Failed to load problems:', err))
      .finally(() => setLoading(false));
  }

  async function handleDelete(id) {
    if (!confirm('Delete this entry permanently?')) return;
    setDeletingId(id);
    try {
      await deleteProblem(id);
      setProblems((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Failed to delete problem:', err);
      alert('Could not delete this entry.');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="mb-5 flex items-center gap-2">
        <ListTree className="h-5 w-5 text-hub-teal" />
        <h2 className="font-display text-lg font-semibold text-hub-900">
          Existing entries ({problems.length})
        </h2>
      </div>

      {loading ? (
        <Loader label="Loading entries" />
      ) : problems.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-400">
          No entries yet. Add your first one above.
        </p>
      ) : (
        <div className="divide-y divide-slate-100">
          {problems.map((p) => {
            const category = getCategoryByName(p.macroCategory);
            return (
              <div key={p.id} className="flex items-center gap-3 py-3">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: category?.hex || '#94A3B8' }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-hub-900">
                    {p.problemText}
                  </p>
                  <p className="text-xs text-slate-400">
                    {p.macroCategory} · {p.subCategory}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={deletingId === p.id}
                  aria-label="Delete entry"
                  className="shrink-0 rounded-md p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
