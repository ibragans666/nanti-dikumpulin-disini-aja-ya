import { AlertTriangle, Info, ShieldAlert, ShieldCheck, Sprout } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";

export default function ResultSection({ result }: { result: any }) {
  if (!result) {
    // Empty State
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center opacity-60 transition-colors">
        <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-full mb-6">
          <Sprout className="w-16 h-16 text-slate-300 dark:text-slate-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-400 dark:text-slate-500 mb-2">Belum ada hasil analisis</h3>
        <p className="text-slate-400 dark:text-slate-500 max-w-xs mx-auto">
          Silakan upload foto daun di panel sebelah kiri, lalu klik tombol 
          <span className="font-bold text-slate-500 dark:text-slate-400"> Diagnosa</span>.
        </p>
      </div>
    );
  }

  const parts = result.advice.split('|||');
  const penjelasan = parts[0] || "Tidak ada informasi.";
  const tindakan = parts[1] || "Tidak ada saran tindakan.";
  const pencegahan = parts[2] || "Tidak ada saran pencegahan.";

  return (
    <div className="animate-fade-in-up">
      {/* HEADER HASIL */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors">
          <div>
            <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Hasil AI</span>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mt-1">{result.label}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-100 dark:border-amber-900/30">
                <AlertTriangle className="w-3 h-3" /> Resiko: {result.risk}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-green-600 dark:text-green-400">{result.confidence}</div>
            <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Tingkat Akurasi</div>
          </div>
      </div>
      <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4">
            <span className="w-1 h-6 bg-green-500 rounded-full block"></span>
            Rekomendasi Penanganan
          </h3>
          <div className="space-y-5">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
              <div className="bg-blue-50 dark:bg-blue-950/30 px-5 py-3 border-b border-blue-100 dark:border-blue-900/20 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-slate-800 dark:text-blue-100">1. Penjelasan Penyakit</h3>
              </div>
              <div className="p-5 text-slate-600 dark:text-slate-300 text-sm">
                <MarkdownRenderer content={penjelasan} colorClass="marker:text-blue-500 dark:marker:text-blue-400" />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md border-l-4 border-red-500 dark:border-red-600 overflow-hidden transition-colors">
              <div className="bg-red-50 dark:bg-red-950/30 px-5 py-3 border-b border-red-100 dark:border-red-900/20 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400" />
                <h3 className="font-bold text-red-800 dark:text-red-100">2. Tindakan Darurat</h3>
              </div>
              <div className="p-5 text-slate-700 dark:text-slate-200 text-sm">
                <MarkdownRenderer content={tindakan} colorClass="marker:text-red-500 dark:marker:text-red-400" />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
              <div className="bg-green-50 dark:bg-green-950/30 px-5 py-3 border-b border-green-100 dark:border-green-900/20 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h3 className="font-bold text-slate-800 dark:text-green-100">3. Pencegahan Masa Depan</h3>
              </div>
              <div className="p-5 text-slate-600 dark:text-slate-300 text-sm">
                <MarkdownRenderer content={pencegahan} colorClass="marker:text-green-500 dark:marker:text-green-400" />
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}