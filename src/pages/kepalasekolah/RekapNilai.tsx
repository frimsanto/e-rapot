import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { classSummary } from '@/data/mockData';
import { Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const KepalaSekolahRekapNilai = () => (
  <AppLayout>
    <PageHeader title="Rekap Nilai Sekolah" description="Ringkasan nilai seluruh kelas" actions={<button className="btn-secondary"><Download className="h-4 w-4"/>Export</button>} />
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <table className="data-table">
        <thead><tr><th>Kelas</th><th>Siswa</th><th>Rata-rata</th><th>Kehadiran</th><th>Perlu Perhatian</th><th>Status</th></tr></thead>
        <tbody>
          {classSummary.map((cls) => (
            <tr key={cls.class}>
              <td className="font-semibold">{cls.class}</td>
              <td>{cls.totalStudents}</td>
              <td><span className={cn('font-bold', cls.avgGrade >= 80 ? 'text-success' : 'text-warning')}>{cls.avgGrade.toFixed(1)}</span></td>
              <td>{cls.attendance}%</td>
              <td>{cls.atRisk > 0 ? <Badge variant="outline" className="bg-warning/10 text-warning">{cls.atRisk} siswa</Badge> : <Badge variant="outline" className="bg-success/10 text-success">Aman</Badge>}</td>
              <td><Badge variant="outline" className={cls.avgGrade >= 80 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}>{cls.avgGrade >= 80 ? 'Baik' : 'Perlu Peningkatan'}</Badge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </AppLayout>
);
export default KepalaSekolahRekapNilai;
