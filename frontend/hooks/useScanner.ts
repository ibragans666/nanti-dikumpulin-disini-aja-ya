import { useState, useEffect } from "react";
import { ScanItem } from "@/types";

// Konfigurasi URL Backend (Otomatis pilih localhost atau Server Railway)
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function useScanner() {
  // --- STATE LAYOUT ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // --- STATE APLIKASI ---
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<ScanItem[]>([]);

  // 1. Cek Ukuran Layar (Responsif)
  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Di desktop otomatis buka, di mobile otomatis tutup
      if (!mobile) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };
    
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // 2. Load History dari Server (Database Supabase via Backend)
  useEffect(() => {
    async function fetchHistory() {
      try {
        // Gunakan API_URL dinamis
        const res = await fetch(`${API_URL}/history`);
        const data = await res.json();
        
        if (data.success) {
          // Mapping data dari format DB ke format Frontend
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
      } catch (e) {
        console.error("Gagal load history, pastikan backend nyala.", e);
      }
    }
    fetchHistory();
  }, []);

  // --- ACTIONS ---

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      
      // Validasi awal (UX)
      if (!selected.type.startsWith("image/")) {
        alert("Harap pilih file gambar (JPG/PNG).");
        return;
      }

      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null); // Reset hasil jika ganti foto baru
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
    setFile(null); // Kosongkan file input karena ini data lama

    // Jika ada URL gambar dari database, tampilkan
    if (item.imageUrl) {
      setPreview(item.imageUrl);
    } else {
      setPreview(null);
    }
    
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleClearHistory = () => {
    // Catatan: Ini hanya menghapus di tampilan frontend sementara.
    // Untuk hapus permanen di DB, butuh endpoint DELETE di backend.
    if (confirm("Hapus tampilan riwayat di sesi ini?")) {
      setHistory([]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    // --- VALIDASI FRONTEND (PENTING) ---
    if (!file.type.startsWith("image/")) {
      alert("Format file harus gambar!");
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB
      alert("File terlalu besar! Maksimal 5MB.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      // Gunakan API_URL dinamis
      const res = await fetch(`${API_URL}/analyze`, { 
        method: "POST", 
        body: formData 
      });
      
      const data = await res.json();
      
      if (data.success) {
        setResult(data.result);
        
        // Tambahkan hasil baru ke state history (Optimistic Update)
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
    } catch (err) { 
      alert("Gagal terhubung ke Backend. Pastikan server menyala."); 
    } finally { 
      setLoading(false); 
    }
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