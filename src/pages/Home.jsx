import { useEffect, useMemo, useState } from 'react';
import { TerminalSquare } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import ProblemCard from '../components/ProblemCard';
import AnnouncementCard from '../components/AnnouncementCard';
import Loader from '../components/Loader';
import { CATEGORIES } from '../data/categories';
import { fetchAllProblems, fetchActiveAnnouncements } from '../utils/firestore';

export default function Home() {
  const [problems, setProblems] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [p, a] = await Promise.all([
          fetchAllProblems(),
          fetchActiveAnnouncements(),
        ]);
        if (active) {
          setProblems(p);
          setAnnouncements(a);
        }
      } catch (err) {
        console.error('Failed to load hub data:', err);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = {};
    for (const cat of CATEGORIES) counts[cat.name] = 0;
    for (const p of problems) {
      if (counts[p.macroCategory] !== undefined) counts[p.macroCategory] += 1;
    }
    console.log('Problems fetched:', problems.length, 'counts:', counts);
    return counts;
  }, [problems]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return problems
      .filter((p) => {
        const haystack = [
          p.problemText,
          p.macroCategory,
          p.subCategory,
          ...(p.possibleCauses || []),
          ...(p.correctiveMaintenance || []),
          ...(p.preventiveMaintenance || []),
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 8);
  }, [query, problems]);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-hub-700 bg-hub-900">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-hub-700 bg-hub-800">
            <TerminalSquare className="h-6 w-6 text-hub-teal" />
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
            Diagnose it. Fix it. Prevent it again.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-hub-500">
            Search the hubs troubleshooting library for causes, prevention
            steps, and ordered corrective fixes across every category of
            computer problem.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar value={query} onChange={setQuery} />
          </div>

          {query && (
            <div className="mx-auto mt-4 max-w-xl text-left">
              {searchResults.length > 0 ? (
                <div className="space-y-2.5 rounded-lg border border-hub-700 bg-hub-800 p-3">
                  {searchResults.map((p) => (
                    <ProblemCard key={p.id} problem={p} />
                  ))}
                </div>
              ) : (
                <p className="rounded-lg border border-hub-700 bg-hub-800 px-4 py-3 text-center font-mono text-sm text-hub-500">
                  no matches for &ldquo;{query}&rdquo;
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Category grid */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-hub-900">
              Browse by category
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Six macro-categories cover the full surface area of computer
              problems.
            </p>
          </div>
        </div>

        {loading ? (
          <Loader label="Loading categories" />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                count={categoryCounts[cat.name] || 0}
              />
            ))}
          </div>
        )}
      </section>

      {/* Announcements */}
      {!loading && announcements.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="font-display text-xl font-semibold text-hub-900">
                Hub announcements
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Service updates and offers from the tech hub team.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {announcements.map((a) => (
                <AnnouncementCard key={a.id} announcement={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
