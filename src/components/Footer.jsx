import { TerminalSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-hub-700 bg-hub-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-hub-500">
            <TerminalSquare className="h-4 w-4 text-hub-teal" />
            <span className="font-mono text-xs tracking-wide">
              computer-problem-hub // status: operational
            </span>
          </div>
          <p className="text-xs text-hub-500">
            &copy; {new Date().getFullYear()} Computer Problem Hub. Built for faster fixes.
          </p>
        </div>
      </div>
    </footer>
  );
}
