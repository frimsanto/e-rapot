import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Shield, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const roles = [
  { name: 'Siswa', permissions: ['view_grades', 'view_schedule', 'view_rapor'] },
  { name: 'Guru', permissions: ['view_grades', 'edit_grades', 'view_schedule', 'manage_attendance'] },
  { name: 'Kurikulum', permissions: ['manage_schedule', 'manage_subjects', 'manage_classes'] },
  { name: 'Wali Kelas', permissions: ['view_grades', 'manage_rapor', 'manage_notes'] },
  { name: 'Kepala Sekolah', permissions: ['view_all', 'approve_rapor', 'view_reports'] },
  { name: 'Admin', permissions: ['full_access'] },
];

const AdminRoles = () => (
  <AppLayout>
    <PageHeader title="Manajemen Role" description="Kelola hak akses pengguna" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {roles.map((role) => (
        <div key={role.name} className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{role.name}</h3>
          </div>
          <div className="space-y-2">
            {role.permissions.map((p) => (
              <div key={p} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                <span className="text-sm text-foreground">{p.replace(/_/g, ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </AppLayout>
);
export default AdminRoles;
