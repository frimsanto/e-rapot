import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Switch } from '@/components/ui/switch';

const KepalaSekolahPengaturan = () => (
  <AppLayout>
    <PageHeader title="Pengaturan" description="Kelola akun kepala sekolah" />
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Notifikasi</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between"><span className="text-sm">Rapor Menunggu Approval</span><Switch defaultChecked /></div>
        <div className="flex items-center justify-between"><span className="text-sm">Laporan Mingguan</span><Switch defaultChecked /></div>
        <div className="flex items-center justify-between"><span className="text-sm">Alert Siswa At Risk</span><Switch defaultChecked /></div>
      </div>
    </div>
  </AppLayout>
);
export default KepalaSekolahPengaturan;
