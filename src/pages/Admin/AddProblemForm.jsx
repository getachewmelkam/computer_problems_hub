import { useState } from 'react';
import { CheckCircle2, Loader2, PlusCircle } from 'lucide-react';
import DynamicListInput from '../../components/DynamicListInput';
import { CATEGORIES } from '../../data/categories';
import { createProblem } from '../../utils/firestore';

const EMPTY_FORM = {
  macroCategory: CATEGORIES[0].name,
  subCategory: CATEGORIES[0].subCategories[0],
  problemText: '',
  imageUrl: '',
  possibleCauses: [''],
  preventiveMaintenance: [''],
  correctiveMaintenance: [''],
};

export default function AddProblemForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const activeCategory = CATEGORIES.find((c) => c.name === form.macroCategory);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleCategoryChange(name) {
    const cat = CATEGORIES.find((c) => c.name === name);
    setForm((prev) => ({
      ...prev,
      macroCategory: name,
      subCategory: cat?.subCategories[0] || '',
    }));
  }

  function clean(arr) {
    return arr.map((s) => s.trim()).filter(Boolean);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const payload = {
      macroCategory: form.macroCategory,
      subCategory: form.subCategory,
      problemText: form.problemText.trim(),
      imageUrl: form.imageUrl.trim() || null,
      possibleCauses: clean(form.possibleCauses),
      preventiveMaintenance: clean(form.preventiveMaintenance),
      correctiveMaintenance: clean(form.correctiveMaintenance),
    };

    if (!payload.problemText) {
      setError('Problem statement is required.');
      return;
    }

    setSaving(true);
    try {
      await createProblem(payload);
      setForm(EMPTY_FORM);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save problem:', err);
      setError('Could not save this entry. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-card"
    >
      <div className="flex items-center gap-2">
        <PlusCircle className="h-5 w-5 text-hub-teal" />
        <h2 className="font-display text-lg font-semibold text-hub-900">
          Add troubleshooting entry
        </h2>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Problem / Title
        </label>
        <input
          type="text"
          required
          value={form.problemText}
          onChange={(e) => updateField('problemText', e.target.value)}
          placeholder="e.g. Laptop shuts down randomly under load"
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-hub-teal focus:ring-4 focus:ring-hub-teal/20"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Macro-category
          </label>
          <select
            value={form.macroCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-hub-teal focus:ring-4 focus:ring-hub-teal/20"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Sub-category
          </label>
          <select
            value={form.subCategory}
            onChange={(e) => updateField('subCategory', e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-hub-teal focus:ring-4 focus:ring-hub-teal/20"
          >
            {activeCategory?.subCategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Image URL <span className="normal-case text-slate-400">(optional)</span>
        </label>
        <input
          type="url"
          value={form.imageUrl}
          onChange={(e) => updateField('imageUrl', e.target.value)}
          placeholder="https://…"
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-hub-teal focus:ring-4 focus:ring-hub-teal/20"
        />
      </div>

      <hr className="border-slate-100" />

      <DynamicListInput
        label="Possible Causes"
        items={form.possibleCauses}
        onChange={(v) => updateField('possibleCauses', v)}
        placeholder="e.g. Dust-clogged heatsink causing thermal throttling"
      />

      <DynamicListInput
        label="Preventive Maintenance"
        items={form.preventiveMaintenance}
        onChange={(v) => updateField('preventiveMaintenance', v)}
        placeholder="e.g. Clean internal fans every 3 months"
      />

      <DynamicListInput
        label="Corrective Maintenance (ordered steps)"
        items={form.correctiveMaintenance}
        onChange={(v) => updateField('correctiveMaintenance', v)}
        placeholder="e.g. Power off and unplug the device"
        ordered
      />

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}
      {success && (
        <p className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          Entry saved to the hub.
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="flex items-center justify-center gap-2 rounded-lg bg-hub-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-hub-800 disabled:opacity-60"
      >
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        {saving ? 'Saving…' : 'Save entry'}
      </button>
    </form>
  );
}
