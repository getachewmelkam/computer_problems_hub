import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryCard({ category, count }) {
  const Icon = category.icon;

  return (
    <Link
      to={`/category/${category.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
      style={{ borderTopWidth: '3px', borderTopColor: category.hex }}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-lg"
          style={{ backgroundColor: `${category.hex}1A` }}
        >
          <Icon className="h-5 w-5" style={{ color: category.hex }} strokeWidth={2} />
        </div>
        <ArrowUpRight className="h-5 w-5 text-slate-300 transition group-hover:text-slate-500" />
      </div>

      <div className="mt-5">
        <h3 className="font-display text-base font-semibold text-hub-900">
          {category.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
          {category.tagline}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span
          className="rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{ backgroundColor: `${category.hex}1A`, color: category.hex }}
        >
          {count} {count === 1 ? 'entry' : 'entries'}
        </span>
        <span className="text-xs font-medium text-slate-400">
          {category.subCategories.length} sub-categories
        </span>
      </div>
    </Link>
  );
}
