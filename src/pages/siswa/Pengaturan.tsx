import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/contexts/AppContext';
import { User, Mail, Lock, Bell, Shield, Smartphone } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const SiswaPengaturan = () => {
  const { user } = useApp();

  return (
    <AppLayout>
      <PageHeader
        title="Pengaturan"
        description="Kelola akun dan preferensi Anda"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Info */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Informasi Akun</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">AF</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{user?.name || 'Ahmad Fauzi'}</p>
                  <p className="text-sm text-muted-foreground">Siswa • Kelas IX-A</p>
                </div>
                <button className="btn-secondary text-sm">Ubah Foto</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      defaultValue={user?.name || 'Ahmad Fauzi'}
                      className="input-field pl-10"
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      defaultValue={user?.email || 'ahmad@siswa.sch.id'}
                      className="input-field pl-10"
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">NISN</label>
                  <input type="text" defaultValue="0012345678" className="input-field" disabled />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Kelas</label>
                  <input type="text" defaultValue="IX-A" className="input-field" disabled />
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Keamanan</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password Saat Ini</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="password" placeholder="••••••••" className="input-field pl-10" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password Baru</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input type="password" placeholder="••••••••" className="input-field pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Konfirmasi Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input type="password" placeholder="••••••••" className="input-field pl-10" />
                  </div>
                </div>
              </div>
              <button className="btn-primary">Ubah Password</button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Notifikasi</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Email</p>
                    <p className="text-xs text-muted-foreground">Notifikasi via email</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Push</p>
                    <p className="text-xs text-muted-foreground">Notifikasi browser</p>
                  </div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Nilai Baru</p>
                    <p className="text-xs text-muted-foreground">Saat guru input nilai</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Sesi Login</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-foreground text-sm">Browser ini</p>
                  <span className="text-xs text-success">Aktif</span>
                </div>
                <p className="text-xs text-muted-foreground">Chrome • Windows • Jakarta</p>
              </div>
              <button className="btn-ghost w-full text-destructive hover:text-destructive text-sm">
                Keluar dari Semua Perangkat
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SiswaPengaturan;
