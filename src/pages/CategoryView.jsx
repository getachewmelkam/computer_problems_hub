import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProblemCard from '../components/ProblemCard';
import Loader from '../components/Loader';
import { getCategoryById } from '../data/categories';
import { fetchProblemsByCategory } from '../utils/firestore';

export default function CategoryView() {
  const { categoryId } = useParams();
  const category = getCategoryById(categoryId);

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSub, setActiveSub] = useState('All');

  useEffect(() => {
    if (!category) return;
    let active = true;
    setLoading(true);
    setActiveSub('All');
    fetchProblemsByCategory(category.name)
      .then((data) => {
        if (active) setProblems(data);
      })
      .catch((err) => console.error('Failed to load category problems:', err))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [category]);

  const filtered = useMemo(() => {
    if (activeSub === 'All') return problems;
    return problems.filter((p) => p.subCategory === activeSub);
  }, [problems, activeSub]);

  if (!category) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="font-display text-lg font-semibold text-hub-900">
          Category not found
        </p>
        <Link to="/" className="mt-3 inline-block text-sm text-hub-teal hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <div>
      <section
        className="border-b border-slate-200"
        style={{ backgroundColor: `${category.hex}0D` }}
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            All categories
          </Link>
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${category.hex}22` }}
            >
              <Icon className="h-6 w-6" style={{ color: category.hex }} />
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-hub-900">
                {category.name}
              </h1>
              <p className="mt-0.5 text-sm text-slate-500">{category.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-wrap gap-2">
          <SubTab label="All" active={activeSub === 'All'} onClick={() => setActiveSub('All')} color={category.hex} />
          {category.subCategories.map((sub) => (
            <SubTab
              key={sub}
              label={sub}
              active={activeSub === sub}
              onClick={() => setActiveSub(sub)}
              color={category.hex}
            />
          ))}
        </div>

        {loading ? (
          <Loader label="Loading entries" />
        ) : filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="font-display text-sm font-semibold text-hub-900">
              No entries here yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Check back soon, or explore another category.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => (
              <ProblemCard key={p.id} problem={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function SubTab({ label, active, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border px-3.5 py-1.5 text-sm font-medium transition"
      style={
        active
          ? { backgroundColor: color, borderColor: color, color: '#fff' }
          : { borderColor: '#E2E8F0', color: '#475569' }
      }
    >
      {label}
    </button>
  );
}
