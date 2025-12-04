import { useState, useEffect } from "react";
import { ScanItem } from "@/types";

export function useScanner() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<ScanItem[]>([]);

  // Cek Layar
  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Load History dari Server
  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("http://localhost:3001/history");
        const data = await res.json();
        
        if (data.success) {
          // Mapping data DB ke Frontend
          const mappedHistory: ScanItem[] = data.data.map((item: any) => ({
            id: item.id,
            title: item.disease,
            date: new Date(item.created_at).toLocaleDateString("id-ID"),
            imageUrl: item.image_url,
            result: {
              label: item.disease,
              confidence: item.confidence,
              risk: item.risk,
              advice: item.advice
            }
          }));
          setHistory(mappedHistory);
        }
      } catch (e) { console.error("Gagal load history", e); }
    }
    fetchHistory();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const handleNewScan = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleSelectHistory = (item: ScanItem) => {
    setResult(item.result);
    setFile(null);

    if (item.imageUrl) {
      setPreview(item.imageUrl);
    } else {
      setPreview(null);
    }
    
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleClearHistory = () => {
    if (confirm("Hapus tampilan riwayat?")) setHistory([]);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("http://localhost:3001/analyze", { method: "POST", body: formData });
      const data = await res.json();
      
      if (data.success) {
        setResult(data.result);
        
        // Update State History Lokal
        const newItem: ScanItem = {
          id: data.result.id,
          title: data.result.label,
          date: new Date().toLocaleDateString("id-ID"),
          imageUrl: data.result.image_url,
          result: data.result
        };
        setHistory([newItem, ...history]); 

      } else {
        alert("Gagal: " + data.error);
      }
    } catch (err) { alert("Backend mati!"); } finally { setLoading(false); }
  };

  return {
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
  };
}