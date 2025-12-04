import { Sprout } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-32 z-40 bg-gradient-to-b from-slate-50 via-slate-50/95 to-transparent dark:from-slate-950 dark:via-slate-950/95 dark:to-transparent pointer-events-none transition-colors duration-300" />
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-full shadow-lg shadow-slate-200/50 dark:shadow-black/40 transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full shadow-md text-white">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                Dokter Tani AI
              </h1>
            </div>
          </div>

          <ThemeToggle />
        </nav>
      </div>
    </>
  );
}