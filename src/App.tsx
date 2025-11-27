import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";

// Auth
import Login from "./pages/auth/Login";

// Siswa
import SiswaBeranda from "./pages/siswa/Beranda";
import SiswaNilai from "./pages/siswa/Nilai";
import SiswaJadwal from "./pages/siswa/Jadwal";
import SiswaRapor from "./pages/siswa/Rapor";
import SiswaPresensi from "./pages/siswa/Presensi";
import SiswaDokumen from "./pages/siswa/Dokumen";
import SiswaPengaturan from "./pages/siswa/Pengaturan";

// Guru
import GuruBeranda from "./pages/guru/Beranda";
import GuruJadwal from "./pages/guru/Jadwal";
import GuruInputNilai from "./pages/guru/InputNilai";
import GuruRekapNilai from "./pages/guru/RekapNilai";
import GuruPresensi from "./pages/guru/Presensi";
import GuruPengaturan from "./pages/guru/Pengaturan";

// Kurikulum
import KurikulumBeranda from "./pages/kurikulum/Beranda";
import KurikulumJadwal from "./pages/kurikulum/Jadwal";
import KurikulumMapel from "./pages/kurikulum/Mapel";
import KurikulumKelas from "./pages/kurikulum/Kelas";
import KurikulumGuruPengampu from "./pages/kurikulum/GuruPengampu";
import KurikulumPengaturan from "./pages/kurikulum/Pengaturan";

// Wali Kelas
import WaliKelasBeranda from "./pages/walikelas/Beranda";
import WaliKelasRapor from "./pages/walikelas/Rapor";
import WaliKelasCatatan from "./pages/walikelas/Catatan";
import WaliKelasPengaturan from "./pages/walikelas/Pengaturan";

// Kepala Sekolah
import KepalaSekolahBeranda from "./pages/kepalasekolah/Beranda";
import KepalaSekolahRekapNilai from "./pages/kepalasekolah/RekapNilai";
import KepalaSekolahPresensi from "./pages/kepalasekolah/Presensi";
import KepalaSekolahMonitoring from "./pages/kepalasekolah/Monitoring";
import KepalaSekolahApproval from "./pages/kepalasekolah/Approval";
import KepalaSekolahPengaturan from "./pages/kepalasekolah/Pengaturan";

// Admin
import AdminBeranda from "./pages/admin/Beranda";
import AdminUsers from "./pages/admin/Users";
import AdminRoles from "./pages/admin/Roles";
import AdminTahunAjaran from "./pages/admin/TahunAjaran";
import AdminSettings from "./pages/admin/Settings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="/auth/login" element={<Login />} />

            {/* Siswa Routes */}
            <Route path="/siswa" element={<SiswaBeranda />} />
            <Route path="/siswa/nilai" element={<SiswaNilai />} />
            <Route path="/siswa/jadwal" element={<SiswaJadwal />} />
            <Route path="/siswa/rapor" element={<SiswaRapor />} />
            <Route path="/siswa/presensi" element={<SiswaPresensi />} />
            <Route path="/siswa/dokumen" element={<SiswaDokumen />} />
            <Route path="/siswa/pengaturan" element={<SiswaPengaturan />} />

            {/* Guru Routes */}
            <Route path="/guru" element={<GuruBeranda />} />
            <Route path="/guru/jadwal" element={<GuruJadwal />} />
            <Route path="/guru/input-nilai" element={<GuruInputNilai />} />
            <Route path="/guru/rekap-nilai" element={<GuruRekapNilai />} />
            <Route path="/guru/presensi" element={<GuruPresensi />} />
            <Route path="/guru/pengaturan" element={<GuruPengaturan />} />

            {/* Kurikulum Routes */}
            <Route path="/kurikulum" element={<KurikulumBeranda />} />
            <Route path="/kurikulum/jadwal" element={<KurikulumJadwal />} />
            <Route path="/kurikulum/mapel" element={<KurikulumMapel />} />
            <Route path="/kurikulum/kelas" element={<KurikulumKelas />} />
            <Route path="/kurikulum/guru-pengampu" element={<KurikulumGuruPengampu />} />
            <Route path="/kurikulum/pengaturan" element={<KurikulumPengaturan />} />

            {/* Wali Kelas Routes */}
            <Route path="/walikelas" element={<WaliKelasBeranda />} />
            <Route path="/walikelas/rapor" element={<WaliKelasRapor />} />
            <Route path="/walikelas/catatan" element={<WaliKelasCatatan />} />
            <Route path="/walikelas/pengaturan" element={<WaliKelasPengaturan />} />

            {/* Kepala Sekolah Routes */}
            <Route path="/kepalasekolah" element={<KepalaSekolahBeranda />} />
            <Route path="/kepalasekolah/rekap-nilai" element={<KepalaSekolahRekapNilai />} />
            <Route path="/kepalasekolah/presensi" element={<KepalaSekolahPresensi />} />
            <Route path="/kepalasekolah/monitoring" element={<KepalaSekolahMonitoring />} />
            <Route path="/kepalasekolah/approval" element={<KepalaSekolahApproval />} />
            <Route path="/kepalasekolah/pengaturan" element={<KepalaSekolahPengaturan />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminBeranda />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/roles" element={<AdminRoles />} />
            <Route path="/admin/tahun-ajaran" element={<AdminTahunAjaran />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
