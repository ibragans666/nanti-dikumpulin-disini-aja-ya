import { Upload, Loader2, Image as ImageIcon, Info } from "lucide-react";

interface InputSectionProps {
  preview: string | null;
  loading: boolean;
  hasFile: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAnalyze: () => void;
}

export default function InputSection({ preview, loading, hasFile, onFileChange, onAnalyze }: InputSectionProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <h2 className="font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
          <Upload className="w-4 h-4" /> Input Foto
        </h2>

        <div 
          className={`relative aspect-square bg-slate-50 dark:bg-slate-800 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden
            ${preview 
              ? 'border-green-500' 
              : 'border-slate-300 dark:border-slate-700 hover:border-green-400 hover:bg-green-50/20 dark:hover:bg-slate-700'}`}
          onClick={() => document.getElementById('fileUpload')?.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center p-6">
              <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Klik untuk Upload</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">JPG / PNG</p>
            </div>
          )}
          <input id="fileUpload" type="file" accept="image/*" onChange={onFileChange} className="hidden" />
        </div>

        {preview && (
           <button 
             onClick={() => document.getElementById('fileUpload')?.click()}
             className="text-xs text-slate-400 dark:text-slate-500 underline mt-2 w-full text-center hover:text-slate-600 dark:hover:text-slate-300"
           >
             Ganti Foto Lain
           </button>
        )}

        <button
          onClick={onAnalyze}
          disabled={loading || !hasFile}
          className={`mt-6 w-full py-3 rounded-xl font-bold text-white flex justify-center items-center gap-2 transition-all shadow-md
            ${loading || !hasFile 
              ? "bg-slate-300 dark:bg-slate-700 cursor-not-allowed shadow-none" 
              : "bg-green-600 hover:bg-green-700 hover:-translate-y-1 shadow-green-200 dark:shadow-none"}`}
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Diagnosa Sekarang"}
        </button>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 text-xs text-blue-700 dark:text-blue-300 leading-relaxed transition-colors">
        <strong className="block mb-1 font-bold flex items-center gap-1">
          <Info className="w-3 h-3" /> Tips Foto:
        </strong>
        Pastikan foto daun terlihat jelas, fokus pada bercak penyakit, dan pencahayaan cukup.
      </div>
    </div>
  );
}