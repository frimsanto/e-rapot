import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Switch } from '@/components/ui/switch';

const WaliKelasPengaturan = () => (
  <AppLayout>
    <PageHeader title="Pengaturan" description="Kelola akun wali kelas" />
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Notifikasi</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between"><span className="text-sm">Email Notifikasi</span><Switch defaultChecked /></div>
        <div className="flex items-center justify-between"><span className="text-sm">Nilai Siswa Rendah</span><Switch defaultChecked /></div>
        <div className="flex items-center justify-between"><span className="text-sm">Kehadiran Rendah</span><Switch defaultChecked /></div>
      </div>
    </div>
  </AppLayout>
);
export default WaliKelasPengaturan;
