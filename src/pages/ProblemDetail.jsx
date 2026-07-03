import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  AlertTriangle,
  ShieldCheck,
  TerminalSquare,
  ImageOff,
} from 'lucide-react';
import Loader from '../components/Loader';
import { getCategoryByName } from '../data/categories';
import { fetchProblemById } from '../utils/firestore';

export default function ProblemDetail() {
  const { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchProblemById(problemId)
      .then((data) => {
        if (!active) return;
        if (!data) setNotFound(true);
        else setProblem(data);
      })
      .catch((err) => console.error('Failed to load problem:', err))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [problemId]);

  if (loading) return <Loader label="Loading entry" />;

  if (notFound || !problem) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="font-display text-lg font-semibold text-hub-900">
          This entry could not be found
        </p>
        <Link to="/" className="mt-3 inline-block text-sm text-hub-teal hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  const category = getCategoryByName(problem.macroCategory);
  const accent = category?.hex || '#334155';

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to={category ? `/category/${category.id}` : '/'}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="h-4 w-4" />
        {category ? category.name : 'All categories'}
      </Link>

      {/* Problem statement + image */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Tag label={problem.macroCategory} color={accent} />
            <Tag label={problem.subCategory} color="#64748B" muted />
          </div>
          <h1 className="font-display text-2xl font-semibold leading-snug text-hub-900 sm:text-3xl">
            {problem.problemText}
          </h1>
        </div>
        <div className="lg:col-span-2">
          {problem.imageUrl ? (
            <img
              src={problem.imageUrl}
              alt={problem.problemText}
              className="h-48 w-full rounded-xl border border-slate-200 object-cover"
            />
          ) : (
            <div className="flex h-48 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-slate-400">
              <ImageOff className="h-6 w-6" />
              <span className="text-xs font-medium">No reference image</span>
            </div>
          )}
        </div>
      </div>

      <hr className="my-8 border-slate-200" />

      {/* Causes + Prevention side by side */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <InfoBox
          icon={AlertTriangle}
          iconColor="#C23B4E"
          title="Possible Causes"
          items={problem.possibleCauses}
        />
        <InfoBox
          icon={ShieldCheck}
          iconColor="#0D9488"
          title="Preventive Maintenance"
          items={problem.preventiveMaintenance}
        />
      </div>

      <hr className="my-8 border-slate-200" />

      {/* Corrective maintenance - terminal style ordered steps */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <TerminalSquare className="h-5 w-5 text-hub-teal" />
          <h2 className="font-display text-lg font-semibold text-hub-900">
            Corrective Maintenance
          </h2>
        </div>

        <div className="overflow-hidden rounded-xl border border-hub-700 bg-hub-900 shadow-card">
          <div className="flex items-center gap-1.5 border-b border-hub-700 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E4572E]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#D4A72C]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-hub-teal/70" />
            <span className="ml-2 font-mono text-xs text-hub-500">
              fix-sequence.sh
            </span>
          </div>
          <ol className="divide-y divide-hub-700">
            {(problem.correctiveMaintenance || []).map((step, i) => (
              <li key={i} className="flex gap-4 px-5 py-4">
                <span className="mt-0.5 shrink-0 font-mono text-sm font-semibold text-hub-teal">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[13.5px] leading-relaxed text-slate-200">
                  {step}
                </span>
              </li>
            ))}
            {(!problem.correctiveMaintenance ||
              problem.correctiveMaintenance.length === 0) && (
              <li className="px-5 py-4 font-mono text-sm text-hub-500">
                no steps recorded
              </li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

function Tag({ label, color, muted }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide"
      style={{
        backgroundColor: muted ? '#F1F5F9' : `${color}1A`,
        color: muted ? '#475569' : color,
      }}
    >
      {label}
    </span>
  );
}

function InfoBox({ icon: Icon, iconColor, title, items }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5" style={{ color: iconColor }} />
        <h3 className="font-display text-base font-semibold text-hub-900">
          {title}
        </h3>
      </div>
      {items && items.length > 0 ? (
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: iconColor }}
              />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-400">Nothing recorded yet.</p>
      )}
    </div>
  );
}
