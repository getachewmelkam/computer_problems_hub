import { Loader2 } from 'lucide-react';

export default function Loader({ label = 'Loading' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-hub-500">
      <Loader2 className="h-6 w-6 animate-spin text-hub-teal" />
      <p className="font-mono text-sm tracking-wide">{label}…</p>
    </div>
  );
}
