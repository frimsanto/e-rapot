import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { students } from '@/data/mockData';
import { Eye, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const WaliKelasRapor = () => {
  const classStudents = students.filter(s => s.class === 'IX-A');
  return (
    <AppLayout>
      <PageHeader title="Rapor Kelas" description="Preview dan kelola rapor siswa IX-A" />
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <table className="data-table">
          <thead><tr><th>No</th><th>Nama</th><th>NISN</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {classStudents.map((student, i) => (
              <tr key={student.id}>
                <td>{i + 1}</td>
                <td className="font-medium">{student.name}</td>
                <td>{student.nisn}</td>
                <td><Badge variant="outline" className={i < 6 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}>{i < 6 ? <><CheckCircle className="h-3 w-3 mr-1"/>Lengkap</> : <><Clock className="h-3 w-3 mr-1"/>Proses</>}</Badge></td>
                <td><button className="btn-secondary text-sm"><Eye className="h-4 w-4"/>Preview</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
};
export default WaliKelasRapor;
