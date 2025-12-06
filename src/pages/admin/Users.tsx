import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { api } from '@/services/api';

const roleColors: Record<string, string> = {
  siswa: 'bg-info/10 text-info',
  guru: 'bg-success/10 text-success',
  kurikulum: 'bg-warning/10 text-warning',
  walikelas: 'bg-purple-100 text-purple-700',
  kepalasekolah: 'bg-primary/10 text-primary',
  admin: 'bg-destructive/10 text-destructive',
};

type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get<{ data: any[] }>(`/pengguna`);
        const penggunaFromApi: AdminUserRow[] = (res.data ?? []).map((p: any) => ({
          id: String(p.idPengguna ?? p.id_pengguna ?? p.id),
          name: p.namaPengguna ?? p.nama_pengguna ?? p.nama ?? p.name,
          email: p.email ?? '',
          role: (p.peran?.kodePeran ?? p.peran?.namaPeran ?? p.role ?? 'admin').toString().toLowerCase(),
        }));

        setUsers(penggunaFromApi);
      } catch (e: any) {
        setError(e?.message ?? 'Gagal memuat data pengguna');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <AppLayout>
      <PageHeader
        title="Manajemen User"
        description="Kelola pengguna sistem"
        actions={
          <button className="btn-primary">
            <Plus className="h-4 w-4" />
            Tambah User
          </button>
        }
      />
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading && (
          <div className="p-4 text-sm text-muted-foreground">Memuat data pengguna dari server...</div>
        )}
        {error && !loading && (
          <div className="p-4 text-sm text-destructive border-b border-border">{error}</div>
        )}
        {!loading && !error && (
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user.id}>
                  <td>{i + 1}</td>
                  <td className="font-medium">{user.name}</td>
                  <td className="text-muted-foreground">{user.email}</td>
                  <td>
                    <Badge
                      variant="outline"
                      className={roleColors[user.role] ?? 'bg-muted text-muted-foreground'}
                    >
                      {user.role}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex gap-1">
                      <button className="btn-ghost p-2">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="btn-ghost p-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppLayout>
  );
};

export default AdminUsers;
