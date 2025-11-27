import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Save, School, Globe, Database } from 'lucide-react';

const AdminSettings = () => (
  <AppLayout>
    <PageHeader title="System Settings" description="Konfigurasi sistem" actions={<button className="btn-primary"><Save className="h-4 w-4"/>Simpan</button>} />
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4"><School className="h-5 w-5 text-primary" /><h3 className="text-lg font-semibold text-foreground">Informasi Sekolah</h3></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium">Nama Sekolah</label><input type="text" defaultValue="SMP Negeri 1 Contoh" className="input-field"/></div>
          <div className="space-y-2"><label className="text-sm font-medium">NPSN</label><input type="text" defaultValue="20123456" className="input-field"/></div>
          <div className="space-y-2"><label className="text-sm font-medium">Alamat</label><input type="text" defaultValue="Jl. Pendidikan No. 1" className="input-field"/></div>
          <div className="space-y-2"><label className="text-sm font-medium">Telepon</label><input type="text" defaultValue="(021) 12345678" className="input-field"/></div>
        </div>
      </div>
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4"><Database className="h-5 w-5 text-primary" /><h3 className="text-lg font-semibold text-foreground">Backup & Restore</h3></div>
        <div className="flex gap-4">
          <button className="btn-secondary">Backup Database</button>
          <button className="btn-ghost">Restore Database</button>
        </div>
      </div>
    </div>
  </AppLayout>
);
export default AdminSettings;
