import { Link } from 'react-router-dom';
import { ChevronRight, ListChecks } from 'lucide-react';
import { getCategoryByName } from '../data/categories';

export default function ProblemCard({ problem }) {
  const category = getCategoryByName(problem.macroCategory);
  const accent = category?.hex || '#334155';

  return (
    <Link
      to={`/problem/${problem.id}`}
      className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-card sm:p-5"
    >
      <div
        className="hidden h-10 w-1.5 shrink-0 rounded-full sm:block"
        style={{ backgroundColor: accent }}
      />
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
            style={{ backgroundColor: `${accent}1A`, color: accent }}
          >
            {problem.subCategory}
          </span>
        </div>
        <h4 className="truncate font-display text-[15px] font-semibold text-hub-900">
          {problem.problemText}
        </h4>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
          <ListChecks className="h-3.5 w-3.5" />
          {problem.correctiveMaintenance?.length || 0} corrective steps
        </p>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-500" />
    </Link>
  );
}
