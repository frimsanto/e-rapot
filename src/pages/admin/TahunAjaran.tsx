import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { semesters } from '@/data/mockData';
import { Plus, Edit, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AdminTahunAjaran = () => (
  <AppLayout>
    <PageHeader title="Tahun Ajaran & Semester" description="Kelola tahun ajaran" actions={<button className="btn-primary"><Plus className="h-4 w-4"/>Tambah</button>} />
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <table className="data-table">
        <thead><tr><th>Nama</th><th>Tahun</th><th>Semester</th><th>Periode</th><th>Status</th><th>Aksi</th></tr></thead>
        <tbody>
          {semesters.map((sem) => (
            <tr key={sem.id}>
              <td className="font-medium">{sem.name}</td>
              <td>{sem.year}</td>
              <td>{sem.semester === 1 ? 'Ganjil' : 'Genap'}</td>
              <td className="text-muted-foreground">{sem.startDate} - {sem.endDate}</td>
              <td>{sem.isActive ? <Badge className="bg-success text-success-foreground"><CheckCircle className="h-3 w-3 mr-1"/>Aktif</Badge> : <Badge variant="outline">Selesai</Badge>}</td>
              <td><button className="btn-ghost p-2"><Edit className="h-4 w-4"/></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </AppLayout>
);
export default AdminTahunAjaran;
