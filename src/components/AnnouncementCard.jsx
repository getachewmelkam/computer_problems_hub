import { Megaphone, Wrench, Newspaper } from 'lucide-react';

const TYPE_META = {
  Advertisement: { icon: Megaphone, label: 'Promotion', color: '#D4A72C' },
  Service: { icon: Wrench, label: 'Service', color: '#0D9488' },
  Blog: { icon: Newspaper, label: 'Update', color: '#3B6E8F' },
};

export default function AnnouncementCard({ announcement }) {
  const meta = TYPE_META[announcement.postType] || TYPE_META.Blog;
  const Icon = meta.icon;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
      {announcement.bannerImage ? (
        <img
          src={announcement.bannerImage}
          alt=""
          className="h-36 w-full object-cover"
        />
      ) : (
        <div
          className="flex h-36 w-full items-center justify-center"
          style={{ backgroundColor: `${meta.color}14` }}
        >
          <Icon className="h-9 w-9" style={{ color: meta.color }} strokeWidth={1.75} />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <span
          className="mb-2 inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
          style={{ backgroundColor: `${meta.color}1A`, color: meta.color }}
        >
          <Icon className="h-3 w-3" />
          {meta.label}
        </span>
        <h3 className="font-display text-[15px] font-semibold text-hub-900">
          {announcement.title}
        </h3>
        <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-slate-500">
          {announcement.content}
        </p>
      </div>
    </article>
  );
}
