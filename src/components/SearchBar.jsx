import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder, autoFocus }) {
  return (
    <div className="group relative w-full">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-hub-500 group-focus-within:text-hub-teal"
        strokeWidth={2}
      />
      <input
        type="text"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search problems, causes, or fixes…'}
        className="w-full rounded-lg border border-hub-700 bg-hub-900 py-3.5 pl-12 pr-11 font-body text-[15px] text-slate-100 placeholder:text-hub-500 outline-none ring-hub-teal/40 transition focus:border-hub-teal focus:ring-4"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-hub-500 transition hover:text-slate-200"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
