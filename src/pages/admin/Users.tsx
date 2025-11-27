import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { users } from '@/data/mockData';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const roleColors: Record<string, string> = { siswa: 'bg-info/10 text-info', guru: 'bg-success/10 text-success', kurikulum: 'bg-warning/10 text-warning', walikelas: 'bg-purple-100 text-purple-700', kepalasekolah: 'bg-primary/10 text-primary', admin: 'bg-destructive/10 text-destructive' };

const AdminUsers = () => (
  <AppLayout>
    <PageHeader title="Manajemen User" description="Kelola pengguna sistem" actions={<button className="btn-primary"><Plus className="h-4 w-4"/>Tambah User</button>} />
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <table className="data-table">
        <thead><tr><th>No</th><th>Nama</th><th>Email</th><th>Role</th><th>Aksi</th></tr></thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id}>
              <td>{i + 1}</td>
              <td className="font-medium">{user.name}</td>
              <td className="text-muted-foreground">{user.email}</td>
              <td><Badge variant="outline" className={roleColors[user.role]}>{user.role}</Badge></td>
              <td><div className="flex gap-1"><button className="btn-ghost p-2"><Edit className="h-4 w-4"/></button><button className="btn-ghost p-2 text-destructive"><Trash2 className="h-4 w-4"/></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </AppLayout>
);
export default AdminUsers;
