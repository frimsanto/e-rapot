import { Link, useLocation } from 'react-router-dom';
import { useApp, Role, Jenjang } from '@/contexts/AppContext';
import {
  Home, BookOpen, Calendar, FileText, ClipboardCheck, Settings, Users,
  GraduationCap, BarChart3, FolderOpen, UserCheck, Briefcase, Award,
  School, Shield, Database, Clock, BookMarked, ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  jenjang?: Jenjang[];
}

const menusByRole: Record<Role, MenuItem[]> = {
  siswa: [
    { icon: Home, label: 'Beranda', path: '/siswa' },
    { icon: BookOpen, label: 'Nilai', path: '/siswa/nilai' },
    { icon: Calendar, label: 'Jadwal Kelas', path: '/siswa/jadwal' },
    { icon: FileText, label: 'Rapor', path: '/siswa/rapor' },
    { icon: BookOpen, label: 'Pertumbuhan (SD)', path: '/siswa/pertumbuhan', jenjang: ['SD'] },
    { icon: Users, label: 'Ekstrakurikuler (SMP)', path: '/siswa/ekstrakurikuler', jenjang: ['SMP'] },
    { icon: ClipboardList, label: 'Projek P5 (SMP)', path: '/siswa/p5', jenjang: ['SMP'] },
    { icon: Briefcase, label: 'PKL / Prakerin (SMK)', path: '/siswa/pkl', jenjang: ['SMK'] },
    { icon: Award, label: 'UKK (SMK)', path: '/siswa/ukk', jenjang: ['SMK'] },
    { icon: FolderOpen, label: 'Portofolio (SMA)', path: '/siswa/portofolio', jenjang: ['SMA'] },
    { icon: ClipboardCheck, label: 'Tryout & Kelulusan (SMA)', path: '/siswa/tryout', jenjang: ['SMA'] },
    { icon: ClipboardCheck, label: 'Presensi', path: '/siswa/presensi' },
    { icon: FolderOpen, label: 'Dokumen', path: '/siswa/dokumen' },
    { icon: Settings, label: 'Pengaturan', path: '/siswa/pengaturan' },
  ],
  guru: [
    { icon: Home, label: 'Beranda', path: '/guru' },
    { icon: Calendar, label: 'Jadwal Mengajar', path: '/guru/jadwal' },
    { icon: BookOpen, label: 'Input Nilai', path: '/guru/input-nilai' },
    { icon: Users, label: 'Ekstrakurikuler (SMP)', path: '/guru/ekstrakurikuler', jenjang: ['SMP'] },
    { icon: ClipboardList, label: 'Projek P5 (SMP)', path: '/guru/p5', jenjang: ['SMP'] },
    { icon: Briefcase, label: 'PKL / Prakerin (SMK)', path: '/guru/pkl', jenjang: ['SMK'] },
    { icon: Award, label: 'UKK (SMK)', path: '/guru/ukk', jenjang: ['SMK'] },
    { icon: BarChart3, label: 'Rekap Nilai', path: '/guru/rekap-nilai' },
    { icon: ClipboardCheck, label: 'Presensi', path: '/guru/presensi' },
    { icon: Settings, label: 'Pengaturan', path: '/guru/pengaturan' },
  ],
  kurikulum: [
    { icon: Home, label: 'Beranda', path: '/kurikulum' },
    { icon: Calendar, label: 'Manajemen Jadwal', path: '/kurikulum/jadwal' },
    { icon: BookMarked, label: 'Mata Pelajaran', path: '/kurikulum/mapel' },
    { icon: Users, label: 'Manajemen Kelas', path: '/kurikulum/kelas' },
    { icon: UserCheck, label: 'Guru Pengampu', path: '/kurikulum/guru-pengampu' },
    { icon: Users, label: 'Ekstrakurikuler (SMP)', path: '/kurikulum/ekstrakurikuler', jenjang: ['SMP'] },
    { icon: ClipboardList, label: 'Projek P5 (SMP)', path: '/kurikulum/p5', jenjang: ['SMP'] },
    { icon: Briefcase, label: 'PKL / Prakerin (SMK)', path: '/kurikulum/pkl', jenjang: ['SMK'] },
    { icon: Award, label: 'UKK (SMK)', path: '/kurikulum/ukk', jenjang: ['SMK'] },
    { icon: Settings, label: 'Pengaturan', path: '/kurikulum/pengaturan' },
  ],
  walikelas: [
    { icon: Home, label: 'Beranda', path: '/walikelas' },
    { icon: FileText, label: 'Rapor Kelas', path: '/walikelas/rapor' },
    { icon: BookOpen, label: 'Perkembangan (SD)', path: '/walikelas/pertumbuhan', jenjang: ['SD'] },
    { icon: ClipboardList, label: 'Catatan Perilaku (SD)', path: '/walikelas/perilaku', jenjang: ['SD'] },
    { icon: Users, label: 'Ekstrakurikuler (SMP)', path: '/walikelas/ekstrakurikuler', jenjang: ['SMP'] },
    { icon: ClipboardList, label: 'Projek P5 (SMP)', path: '/walikelas/p5', jenjang: ['SMP'] },
    { icon: Briefcase, label: 'PKL / Prakerin (SMK)', path: '/walikelas/pkl', jenjang: ['SMK'] },
    { icon: ClipboardList, label: 'Catatan Siswa', path: '/walikelas/catatan' },
    { icon: Settings, label: 'Pengaturan', path: '/walikelas/pengaturan' },
  ],
  kepalasekolah: [
    { icon: Home, label: 'Beranda', path: '/kepalasekolah' },
    { icon: BarChart3, label: 'Rekap Nilai', path: '/kepalasekolah/rekap-nilai' },
    { icon: ClipboardCheck, label: 'Rekap Presensi', path: '/kepalasekolah/presensi' },
    { icon: School, label: 'Monitoring Kelas', path: '/kepalasekolah/monitoring' },
    { icon: Award, label: 'Approval Rapor', path: '/kepalasekolah/approval' },
    { icon: Briefcase, label: 'PKL / Prakerin (SMK)', path: '/kepalasekolah/pkl', jenjang: ['SMK'] },
    { icon: Award, label: 'UKK (SMK)', path: '/kepalasekolah/ukk', jenjang: ['SMK'] },
    { icon: Settings, label: 'Pengaturan', path: '/kepalasekolah/pengaturan' },
  ],
  admin: [
    { icon: Home, label: 'Beranda', path: '/admin' },
    { icon: Users, label: 'Manajemen User', path: '/admin/users' },
    { icon: Shield, label: 'Manajemen Role', path: '/admin/roles' },
    { icon: Clock, label: 'Tahun Ajaran', path: '/admin/tahun-ajaran' },
    { icon: Database, label: 'System Settings', path: '/admin/settings' },
  ],
};

const roleLabels: Record<Role, string> = {
  siswa: 'Siswa',
  guru: 'Guru',
  kurikulum: 'Kurikulum',
  walikelas: 'Wali Kelas',
  kepalasekolah: 'Kepala Sekolah',
  admin: 'Administrator',
};

export const Sidebar = () => {
  const { role, jenjang } = useApp();
  const location = useLocation();
  const menuItems = menusByRole[role].filter((item) => !item.jenjang || item.jenjang.includes(jenjang));

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">E-Raport</h1>
            <p className="text-xs text-muted-foreground">PRO</p>
          </div>
        </div>

        {/* Role Badge */}
        <div className="px-4 py-4">
          <div className="rounded-lg bg-primary/5 px-3 py-2">
            <p className="text-xs font-medium text-muted-foreground">Masuk sebagai</p>
            <p className="text-sm font-semibold text-primary">{roleLabels[role]}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== `/${role}` && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'nav-item',
                  isActive && 'nav-item-active'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <p className="text-xs text-muted-foreground text-center">
            © 2024 E-Raport PRO
          </p>
        </div>
      </div>
    </aside>
  );
};
