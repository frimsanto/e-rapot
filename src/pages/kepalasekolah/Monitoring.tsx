import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { classSummary } from '@/data/mockData';
import { Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const KepalaSekolahMonitoring = () => (
  <AppLayout>
    <PageHeader title="Monitoring Kelas" description="Pantau performa setiap kelas" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {classSummary.map((cls) => (
        <div key={cls.class} className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-colors">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold text-foreground">Kelas {cls.class}</h3>
            <Badge variant="outline">{cls.totalStudents} siswa</Badge>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center"><p className="text-2xl font-bold text-primary">{cls.avgGrade.toFixed(1)}</p><p className="text-xs text-muted-foreground">Rata-rata</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-success">{cls.attendance}%</p><p className="text-xs text-muted-foreground">Kehadiran</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-warning">{cls.atRisk}</p><p className="text-xs text-muted-foreground">At Risk</p></div>
          </div>
          <button className="btn-secondary w-full"><Eye className="h-4 w-4"/>Detail Kelas</button>
        </div>
      ))}
    </div>
  </AppLayout>
);
export default KepalaSekolahMonitoring;
