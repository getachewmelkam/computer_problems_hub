import { Plus, Trash2, GripVertical } from 'lucide-react';

export default function DynamicListInput({
  label,
  items,
  onChange,
  placeholder,
  ordered = false,
}) {
  function updateItem(i, value) {
    const next = [...items];
    next[i] = value;
    onChange(next);
  }

  function addItem() {
    onChange([...items, '']);
  }

  function removeItem(i) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            {ordered ? (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 font-mono text-xs font-semibold text-slate-500">
                {i + 1}
              </span>
            ) : (
              <GripVertical className="h-4 w-4 shrink-0 text-slate-300" />
            )}
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-hub-teal focus:ring-4 focus:ring-hub-teal/20"
            />
            <button
              type="button"
              onClick={() => removeItem(i)}
              aria-label="Remove item"
              className="shrink-0 rounded-md p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addItem}
        className="mt-2.5 flex items-center gap-1.5 text-sm font-medium text-hub-teal hover:underline"
      >
        <Plus className="h-4 w-4" />
        Add {ordered ? 'step' : 'item'}
      </button>
    </div>
  );
}
