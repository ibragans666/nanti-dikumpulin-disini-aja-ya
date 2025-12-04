"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import InputSection from "@/components/InputSection";
import ResultSection from "@/components/ResultSection";

export default function ScanPage() {
  // State Logika App (Scanner)
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      // Note: URL Backend tetap sama
      const res = await fetch("http://localhost:3001/analyze", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) setResult(data.result);
      else alert("Gagal: " + data.error);
    } catch (err) { alert("Backend mati!"); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300 pt-24 pb-10 animate-fade-in bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <InputSection 
            preview={preview}
            loading={loading}
            hasFile={!!file}
            onFileChange={handleFileChange}
            onAnalyze={handleAnalyze}
          />
          <ResultSection result={result} />
        </div>
      </div>
    </div>
  );
}