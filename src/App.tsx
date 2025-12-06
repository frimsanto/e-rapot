import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppProvider, useApp, Role } from "@/contexts/AppContext";
import type { ReactNode } from "react";

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
import SiswaPertumbuhan from "./pages/siswa/Pertumbuhan";
import SiswaEkstrakurikuler from "./pages/siswa/Ekstrakurikuler";
import SiswaP5 from "./pages/siswa/P5";
import SiswaPKL from "./pages/siswa/PKL";
import SiswaUKK from "./pages/siswa/UKK";
import SiswaPortofolio from "./pages/siswa/Portofolio";
import SiswaTryout from "./pages/siswa/Tryout";

// Guru
import GuruBeranda from "./pages/guru/Beranda";
import GuruJadwal from "./pages/guru/Jadwal";
import GuruInputNilai from "./pages/guru/InputNilai";
import GuruRekapNilai from "./pages/guru/RekapNilai";
import GuruPresensi from "./pages/guru/Presensi";
import GuruPengaturan from "./pages/guru/Pengaturan";
import GuruEkstrakurikuler from "./pages/guru/Ekstrakurikuler";
import GuruP5 from "./pages/guru/P5";
import GuruPKL from "./pages/guru/PKL";
import GuruUKK from "./pages/guru/UKK";

// Kurikulum
import KurikulumBeranda from "./pages/kurikulum/Beranda";
import KurikulumJadwal from "./pages/kurikulum/Jadwal";
import KurikulumMapel from "./pages/kurikulum/Mapel";
import KurikulumKelas from "./pages/kurikulum/Kelas";
import KurikulumGuruPengampu from "./pages/kurikulum/GuruPengampu";
import KurikulumPengaturan from "./pages/kurikulum/Pengaturan";
import KurikulumEkstrakurikuler from "./pages/kurikulum/Ekstrakurikuler";
import KurikulumP5 from "./pages/kurikulum/P5";
import KurikulumPKL from "./pages/kurikulum/PKL";
import KurikulumUKK from "./pages/kurikulum/UKK";

// Wali Kelas
import WaliKelasBeranda from "./pages/walikelas/Beranda";
import WaliKelasRapor from "./pages/walikelas/Rapor";
import WaliKelasCatatan from "./pages/walikelas/Catatan";
import WaliKelasPengaturan from "./pages/walikelas/Pengaturan";
import WaliKelasPertumbuhan from "./pages/walikelas/Pertumbuhan";
import WaliKelasPerilaku from "./pages/walikelas/Perilaku";

// Kepala Sekolah
import KepalaSekolahBeranda from "./pages/kepalasekolah/Beranda";
import KepalaSekolahRekapNilai from "./pages/kepalasekolah/RekapNilai";
import KepalaSekolahPresensi from "./pages/kepalasekolah/Presensi";
import KepalaSekolahMonitoring from "./pages/kepalasekolah/Monitoring";
import KepalaSekolahApproval from "./pages/kepalasekolah/Approval";
import KepalaSekolahPengaturan from "./pages/kepalasekolah/Pengaturan";
import KepalaSekolahPKL from "./pages/kepalasekolah/PKL";
import KepalaSekolahUKK from "./pages/kepalasekolah/UKK";

// Admin
import AdminBeranda from "./pages/admin/Beranda";
import AdminUsers from "./pages/admin/Users";
import AdminRoles from "./pages/admin/Roles";
import AdminTahunAjaran from "./pages/admin/TahunAjaran";
import AdminSettings from "./pages/admin/Settings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const defaultRouteByRole: Record<Role, string> = {
  siswa: "/siswa",
  guru: "/guru",
  kurikulum: "/kurikulum",
  walikelas: "/walikelas",
  kepalasekolah: "/kepalasekolah",
  admin: "/admin",
};

interface RoleRouteProps {
  allowedRoles: Role[];
  children: ReactNode;
}

const RoleRoute = ({ allowedRoles, children }: RoleRouteProps) => {
  const { isAuthenticated, role } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  if (!allowedRoles.includes(role)) {
    const target = defaultRouteByRole[role] ?? "/";
    return <Navigate to={target} replace />;
  }

  return <>{children}</>;
};

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
            <Route
              path="/siswa"
              element={
                <RoleRoute allowedRoles={["siswa"]}>
                  <SiswaBeranda />
                </RoleRoute>
              }
            />
            <Route
              path="/siswa/pertumbuhan"
              element={
                <RoleRoute allowedRoles={["siswa"]}>
                  <SiswaPertumbuhan />
                </RoleRoute>
              }
            />
            <Route
              path="/siswa/ekstrakurikuler"
              element={
                <RoleRoute allowedRoles={["siswa"]}>
                  <SiswaEkstrakurikuler />
                </RoleRoute>
              }
            />
            <Route
              path="/siswa/p5"
              element={
                <RoleRoute allowedRoles={["siswa"]}>
                  <SiswaP5 />
                </RoleRoute>
              }
            />
            <Route
              path="/siswa/pkl"
              element={
                <RoleRoute allowedRoles={["siswa"]}>
                  <SiswaPKL />
                </RoleRoute>
              }
            />
            <Route
              path="/siswa/ukk"
              element={
                <RoleRoute allowedRoles={["siswa"]}>
                  <SiswaUKK />
                </RoleRoute>
              }
            />
            <Route
              path="/siswa/portofolio"
              element={
                <RoleRoute allowedRoles={["siswa"]}>
                  <SiswaPortofolio />
                </RoleRoute>
              }
            />
            <Route
              path="/siswa/tryout"
              element={
                <RoleRoute allowedRoles={["siswa"]}>
                  <SiswaTryout />
                </RoleRoute>
              }
            />
            <Route
              path="/siswa/nilai"
              element={
                <RoleRoute allowedRoles={["siswa"]}>
                  <SiswaNilai />
                </RoleRoute>
              }
            />
            <Route
              path="/siswa/jadwal"
              element={
                <RoleRoute allowedRoles={["siswa"]}>
                  <SiswaJadwal />
                </RoleRoute>
              }
            />
            <Route
              path="/siswa/rapor"
              element={
                <RoleRoute allowedRoles={["siswa"]}>
                  <SiswaRapor />
                </RoleRoute>
              }
            />
            <Route
              path="/siswa/presensi"
              element={
                <RoleRoute allowedRoles={["siswa"]}>
                  <SiswaPresensi />
                </RoleRoute>
              }
            />
            <Route
              path="/siswa/dokumen"
              element={
                <RoleRoute allowedRoles={["siswa"]}>
                  <SiswaDokumen />
                </RoleRoute>
              }
            />
            <Route
              path="/siswa/pengaturan"
              element={
                <RoleRoute allowedRoles={["siswa"]}>
                  <SiswaPengaturan />
                </RoleRoute>
              }
            />

            {/* Guru Routes */}
            <Route
              path="/guru"
              element={
                <RoleRoute allowedRoles={["guru"]}>
                  <GuruBeranda />
                </RoleRoute>
              }
            />
            <Route
              path="/guru/jadwal"
              element={
                <RoleRoute allowedRoles={["guru"]}>
                  <GuruJadwal />
                </RoleRoute>
              }
            />
            <Route
              path="/guru/input-nilai"
              element={
                <RoleRoute allowedRoles={["guru"]}>
                  <GuruInputNilai />
                </RoleRoute>
              }
            />
            <Route
              path="/guru/ekstrakurikuler"
              element={
                <RoleRoute allowedRoles={["guru"]}>
                  <GuruEkstrakurikuler />
                </RoleRoute>
              }
            />
            <Route
              path="/guru/p5"
              element={
                <RoleRoute allowedRoles={["guru"]}>
                  <GuruP5 />
                </RoleRoute>
              }
            />
            <Route
              path="/guru/rekap-nilai"
              element={
                <RoleRoute allowedRoles={["guru"]}>
                  <GuruRekapNilai />
                </RoleRoute>
              }
            />
            <Route
              path="/guru/pkl"
              element={
                <RoleRoute allowedRoles={["guru"]}>
                  <GuruPKL />
                </RoleRoute>
              }
            />
            <Route
              path="/guru/ukk"
              element={
                <RoleRoute allowedRoles={["guru"]}>
                  <GuruUKK />
                </RoleRoute>
              }
            />
            <Route
              path="/guru/presensi"
              element={
                <RoleRoute allowedRoles={["guru"]}>
                  <GuruPresensi />
                </RoleRoute>
              }
            />
            <Route
              path="/guru/pengaturan"
              element={
                <RoleRoute allowedRoles={["guru"]}>
                  <GuruPengaturan />
                </RoleRoute>
              }
            />

            {/* Kurikulum Routes */}
            <Route
              path="/kurikulum"
              element={
                <RoleRoute allowedRoles={["kurikulum"]}>
                  <KurikulumBeranda />
                </RoleRoute>
              }
            />
            <Route
              path="/kurikulum/jadwal"
              element={
                <RoleRoute allowedRoles={["kurikulum"]}>
                  <KurikulumJadwal />
                </RoleRoute>
              }
            />
            <Route
              path="/kurikulum/mapel"
              element={
                <RoleRoute allowedRoles={["kurikulum"]}>
                  <KurikulumMapel />
                </RoleRoute>
              }
            />
            <Route
              path="/kurikulum/kelas"
              element={
                <RoleRoute allowedRoles={["kurikulum"]}>
                  <KurikulumKelas />
                </RoleRoute>
              }
            />
            <Route
              path="/kurikulum/guru-pengampu"
              element={
                <RoleRoute allowedRoles={["kurikulum"]}>
                  <KurikulumGuruPengampu />
                </RoleRoute>
              }
            />
            <Route
              path="/kurikulum/pengaturan"
              element={
                <RoleRoute allowedRoles={["kurikulum"]}>
                  <KurikulumPengaturan />
                </RoleRoute>
              }
            />

            {/* Wali Kelas Routes */}
            <Route
              path="/walikelas"
              element={
                <RoleRoute allowedRoles={["walikelas"]}>
                  <WaliKelasBeranda />
                </RoleRoute>
              }
            />
            <Route
              path="/walikelas/rapor"
              element={
                <RoleRoute allowedRoles={["walikelas"]}>
                  <WaliKelasRapor />
                </RoleRoute>
              }
            />
            <Route
              path="/walikelas/catatan"
              element={
                <RoleRoute allowedRoles={["walikelas"]}>
                  <WaliKelasCatatan />
                </RoleRoute>
              }
            />
            <Route
              path="/walikelas/pengaturan"
              element={
                <RoleRoute allowedRoles={["walikelas"]}>
                  <WaliKelasPengaturan />
                </RoleRoute>
              }
            />

            {/* Kepala Sekolah Routes */}
            <Route
              path="/kepalasekolah"
              element={
                <RoleRoute allowedRoles={["kepalasekolah"]}>
                  <KepalaSekolahBeranda />
                </RoleRoute>
              }
            />
            <Route
              path="/kepalasekolah/rekap-nilai"
              element={
                <RoleRoute allowedRoles={["kepalasekolah"]}>
                  <KepalaSekolahRekapNilai />
                </RoleRoute>
              }
            />
            <Route
              path="/kepalasekolah/presensi"
              element={
                <RoleRoute allowedRoles={["kepalasekolah"]}>
                  <KepalaSekolahPresensi />
                </RoleRoute>
              }
            />
            <Route
              path="/kepalasekolah/monitoring"
              element={
                <RoleRoute allowedRoles={["kepalasekolah"]}>
                  <KepalaSekolahMonitoring />
                </RoleRoute>
              }
            />
            <Route
              path="/kepalasekolah/approval"
              element={
                <RoleRoute allowedRoles={["kepalasekolah"]}>
                  <KepalaSekolahApproval />
                </RoleRoute>
              }
            />
            <Route
              path="/kepalasekolah/pengaturan"
              element={
                <RoleRoute allowedRoles={["kepalasekolah"]}>
                  <KepalaSekolahPengaturan />
                </RoleRoute>
              }
            />
            <Route
              path="/kepalasekolah/pkl"
              element={
                <RoleRoute allowedRoles={["kepalasekolah"]}>
                  <KepalaSekolahPKL />
                </RoleRoute>
              }
            />
            <Route
              path="/kepalasekolah/ukk"
              element={
                <RoleRoute allowedRoles={["kepalasekolah"]}>
                  <KepalaSekolahUKK />
                </RoleRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <RoleRoute allowedRoles={["admin"]}>
                  <AdminBeranda />
                </RoleRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <RoleRoute allowedRoles={["admin"]}>
                  <AdminUsers />
                </RoleRoute>
              }
            />
            <Route
              path="/admin/roles"
              element={
                <RoleRoute allowedRoles={["admin"]}>
                  <AdminRoles />
                </RoleRoute>
              }
            />
            <Route
              path="/admin/tahun-ajaran"
              element={
                <RoleRoute allowedRoles={["admin"]}>
                  <AdminTahunAjaran />
                </RoleRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <RoleRoute allowedRoles={["admin"]}>
                  <AdminSettings />
                </RoleRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
