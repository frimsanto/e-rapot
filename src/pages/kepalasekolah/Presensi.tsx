import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { classSummary } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const KepalaSekolahPresensi = () => (
  <AppLayout>
    <PageHeader title="Rekap Presensi" description="Kehadiran siswa per kelas" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {classSummary.map((cls) => (
        <div key={cls.class} className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-lg text-foreground mb-2">{cls.class}</h3>
          <p className="text-sm text-muted-foreground mb-4">{cls.totalStudents} siswa</p>
          <div className="flex items-center justify-between">
            <span className={cn('text-3xl font-bold', cls.attendance >= 95 ? 'text-success' : 'text-warning')}>{cls.attendance}%</span>
            <Badge variant="outline" className={cls.attendance >= 95 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}>{cls.attendance >= 95 ? 'Baik' : 'Perhatian'}</Badge>
          </div>
        </div>
      ))}
    </div>
  </AppLayout>
);
export default KepalaSekolahPresensi;
