import { useEffect, useState } from 'react';
import { Loader2, Megaphone, Trash2, CheckCircle2 } from 'lucide-react';
import Loader from '../../components/Loader';
import {
  fetchAllAnnouncements,
  createAnnouncement,
  toggleAnnouncementActive,
  deleteAnnouncement,
} from '../../utils/firestore';

const EMPTY_FORM = {
  title: '',
  content: '',
  bannerImage: '',
  postType: 'Advertisement',
  isActive: true,
};

const POST_TYPES = ['Advertisement', 'Service', 'Blog'];

export default function ManageAnnouncements() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    load();
  }, []);

  function load() {
    setLoading(true);
    fetchAllAnnouncements()
      .then(setItems)
      .catch((err) => console.error('Failed to load announcements:', err))
      .finally(() => setLoading(false));
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required.');
      return;
    }
    setSaving(true);
    try {
      await createAnnouncement({
        title: form.title.trim(),
        content: form.content.trim(),
        bannerImage: form.bannerImage.trim() || null,
        postType: form.postType,
        isActive: form.isActive,
      });
      setForm(EMPTY_FORM);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      load();
    } catch (err) {
      console.error('Failed to save announcement:', err);
      setError('Could not save this announcement. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(id, current) {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, isActive: !current } : it))
    );
    try {
      await toggleAnnouncementActive(id, !current);
    } catch (err) {
      console.error('Failed to toggle announcement:', err);
      load();
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this announcement permanently?')) return;
    try {
      await deleteAnnouncement(id);
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (err) {
      console.error('Failed to delete announcement:', err);
      alert('Could not delete this announcement.');
    }
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-card"
      >
        <div className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-hub-gold" />
          <h2 className="font-display text-lg font-semibold text-hub-900">
            Create announcement / advertisement
          </h2>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="e.g. Free diagnostics weekend — book your slot"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-hub-teal focus:ring-4 focus:ring-hub-teal/20"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Content
          </label>
          <textarea
            rows={3}
            value={form.content}
            onChange={(e) => updateField('content', e.target.value)}
            placeholder="Describe the announcement, promotion, or service update…"
            className="w-full resize-none rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-hub-teal focus:ring-4 focus:ring-hub-teal/20"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Type
            </label>
            <select
              value={form.postType}
              onChange={(e) => updateField('postType', e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-hub-teal focus:ring-4 focus:ring-hub-teal/20"
            >
              {POST_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Banner image URL <span className="normal-case text-slate-400">(optional)</span>
            </label>
            <input
              type="url"
              value={form.bannerImage}
              onChange={(e) => updateField('bannerImage', e.target.value)}
              placeholder="https://…"
              className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-hub-teal focus:ring-4 focus:ring-hub-teal/20"
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => updateField('isActive', e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-hub-teal focus:ring-hub-teal"
          />
          Publish immediately (visible on home page)
        </label>

        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}
        {success && (
          <p className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            Announcement saved.
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-lg bg-hub-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-hub-800 disabled:opacity-60"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? 'Saving…' : 'Publish announcement'}
        </button>
      </form>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <h3 className="mb-5 font-display text-base font-semibold text-hub-900">
          All announcements ({items.length})
        </h3>
        {loading ? (
          <Loader label="Loading announcements" />
        ) : items.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-400">
            No announcements yet.
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((a) => (
              <div key={a.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-hub-900">
                    {a.title}
                  </p>
                  <p className="text-xs text-slate-400">{a.postType}</p>
                </div>
                <button
                  onClick={() => handleToggle(a.id, a.isActive)}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition ${
                    a.isActive
                      ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {a.isActive ? 'Active' : 'Hidden'}
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  aria-label="Delete announcement"
                  className="shrink-0 rounded-md p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
