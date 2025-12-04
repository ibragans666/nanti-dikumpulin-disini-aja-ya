import { Sprout, X, Plus, History, Settings, Trash2 } from "lucide-react";
import { ScanItem } from "@/types";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  history: ScanItem[]; 
  onClose: () => void;
  onNewScan: () => void;
  onSelectHistory: (item: ScanItem) => void;
  onClearHistory: () => void;
}

export default function Sidebar({ 
  isOpen, 
  isMobile, 
  history, 
  onClose, 
  onNewScan, 
  onSelectHistory,
  onClearHistory 
}: SidebarProps) {

  return (
    <aside 
      className={`
        fixed md:relative z-40 h-full flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out
        bg-white dark:bg-black border-r border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300
        ${isOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0 md:w-0 opacity-0 md:opacity-100"}
        ${!isOpen && "md:overflow-hidden"} 
      `}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-white/10 h-16">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold overflow-hidden whitespace-nowrap">
          <div className="p-1 bg-emerald-100 dark:bg-emerald-500/20 rounded-md">
              <Sprout className="w-5 h-5" />
          </div>
          <span>Dokter Tani</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded-md transition-colors md:hidden text-slate-500 dark:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Tombol New Chat */}
      <div className="p-4">
        <button 
          onClick={onNewScan}
          className="w-full flex items-center gap-3 px-4 py-3 bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white rounded-xl transition-all shadow-lg shadow-green-500/20 dark:shadow-green-900/20 group border border-transparent dark:border-green-500/50"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          <span className="font-medium whitespace-nowrap">Diagnosa Baru</span>
        </button>
      </div>

      {/* List Riwayat */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
        <div className="flex items-center justify-between px-3 mb-2 mt-2">
           <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Riwayat</p>
           {history.length > 0 && (
             <button onClick={onClearHistory} className="text-[10px] text-red-400 hover:text-red-600 flex items-center gap-1">
               <Trash2 className="w-3 h-3" /> Hapus
             </button>
           )}
        </div>
        
        {history.length === 0 ? (
          <div className="text-center py-10 px-4 text-xs text-slate-400">Belum ada riwayat.</div>
        ) : (
          history.map((item) => (
            <button 
              key={item.id} 
              onClick={() => onSelectHistory(item)}
              className="w-full flex items-center gap-3 px-3 py-3 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white rounded-lg transition-all group text-left border border-transparent hover:border-slate-200 dark:hover:border-white/10"
            >
              <History className="w-4 h-4 flex-shrink-0 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              <div className="flex-1 truncate">
                <div className="truncate font-medium">{item.title}</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-600">{item.date}</div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-white/10">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors text-slate-600 dark:text-slate-300">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-md">DT</div>
          <div className="flex-1 text-left truncate">
            <div className="font-bold text-slate-800 dark:text-white">Petani Cerdas</div>
            <div className="text-xs text-slate-500">Pro Plan</div>
          </div>
          <Settings className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </aside>
  );
}