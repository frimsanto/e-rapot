import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/contexts/AppContext';
import { User, Mail, Lock, Bell, Calendar, Settings } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const KurikulumPengaturan = () => {
  const { user } = useApp();

  return (
    <AppLayout>
      <PageHeader
        title="Pengaturan"
        description="Kelola akun dan preferensi kurikulum"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Informasi Akun</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">BH</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{user?.name || 'Pak Bambang Hartono'}</p>
                  <p className="text-sm text-muted-foreground">Wakil Kepala Sekolah Bidang Kurikulum</p>
                </div>
                <button className="btn-secondary text-sm">Ubah Foto</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nama Lengkap</label>
                  <input type="text" defaultValue={user?.name || 'Pak Bambang Hartono'} className="input-field" disabled />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input type="email" defaultValue={user?.email || 'bambang@sekolah.sch.id'} className="input-field" disabled />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">NIP</label>
                  <input type="text" defaultValue="197801012005011001" className="input-field" disabled />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Jabatan</label>
                  <input type="text" defaultValue="Wakasek Kurikulum" className="input-field" disabled />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Keamanan</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password Baru</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Konfirmasi Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
              </div>
              <button className="btn-primary">Ubah Password</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Notifikasi</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">Email</p>
                  <p className="text-xs text-muted-foreground">Notifikasi via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">Jadwal Konflik</p>
                  <p className="text-xs text-muted-foreground">Alert bentrok jadwal</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">Rapor Pending</p>
                  <p className="text-xs text-muted-foreground">Rapor belum lengkap</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default KurikulumPengaturan;
