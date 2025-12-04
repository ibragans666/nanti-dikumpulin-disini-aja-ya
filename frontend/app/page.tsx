"use client";
import { Menu, Leaf } from "lucide-react";

import { useScanner } from "@/hooks/useScanner"; 
import Sidebar from "@/components/Sidebar";
import InputSection from "@/components/InputSection";
import ResultSection from "@/components/ResultSection";
import ThemeToggle from "@/components/ThemeToggle"; 

export default function Home() {
  const {
    isSidebarOpen,
    isMobile,
    file,
    preview,
    loading,
    result,
    history,
    toggleSidebar,
    closeSidebar,
    handleFileChange,
    handleAnalyze,
    handleNewScan,
    handleSelectHistory,
    handleClearHistory
  } = useScanner();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300 relative">
      
      {/* Overlay Mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="absolute inset-0 bg-black/50 z-30 backdrop-blur-sm transition-opacity"
          onClick={closeSidebar} 
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        history={history}
        onClose={closeSidebar}
        onNewScan={handleNewScan}
        onSelectHistory={handleSelectHistory}
        onClearHistory={handleClearHistory}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-20 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex flex-col">
               <h1 className="font-bold text-slate-800 dark:text-slate-100 text-lg leading-none flex items-center gap-2">
                 Dokter Tani <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full border border-amber-200 uppercase tracking-wide hidden sm:inline-block">AI Beta</span>
               </h1>
            </div>
          </div>
          <ThemeToggle />
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth pb-20">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Greeting */}
            {!file && !result && !preview && (
              <div className="text-center py-10 animate-fade-in-up">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-green-500/20 mb-6 rotate-3 hover:rotate-6 transition-transform">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-2">Halo, Sobat Tani! 👋</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm md:text-base">
                  Saya siap membantu mendeteksi penyakit tanaman Padi & Jagung Anda.
                </p>
              </div>
            )}

            <div className={`grid gap-8 transition-all duration-500 ${result ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1 max-w-xl mx-auto'} items-start`}>
              
              <div className={`
                ${result ? 'lg:col-span-4 lg:sticky lg:top-6 h-fit' : 'w-full'} 
                ${result && !file ? 'hidden lg:block lg:opacity-50 hover:opacity-100 transition-opacity' : ''}
              `}>
                <InputSection 
                  preview={preview}
                  loading={loading}
                  hasFile={!!file}
                  onFileChange={handleFileChange}
                  onAnalyze={handleAnalyze}
                />
              </div>

              {/* KOLOM KANAN (SCROLLABLE) */}
              {result && (
                <div className={`${!file ? 'lg:col-span-12' : 'lg:col-span-8'} animate-fade-in`}>
                  {!file && (
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg text-blue-600 dark:text-blue-300 text-sm flex items-center justify-between">
                      <span>📂 Anda sedang melihat riwayat tersimpan.</span>
                      <button onClick={handleNewScan} className="font-bold hover:underline">Buat Scan Baru</button>
                    </div>
                  )}
                  <ResultSection result={result} />
                </div>
              )}

            </div>
          </div>
        </div>

      </main>
    </div>
  );
}