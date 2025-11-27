import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { students, grades } from '@/data/mockData';
import { Users, Trophy, Calendar, AlertCircle } from 'lucide-react';

const WaliKelasBeranda = () => {
  const classStudents = students.filter(s => s.class === 'IX-A');
  return (
    <AppLayout>
      <PageHeader title="Dashboard Wali Kelas" description="Kelas IX-A • Semester Genap 2023/2024" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Jumlah Siswa" value={classStudents.length} icon={Users} />
        <StatsCard title="Rata-rata Nilai" value="84.5" icon={Trophy} />
        <StatsCard title="Kehadiran" value="95%" icon={Calendar} />
        <StatsCard title="Perlu Perhatian" value="2" icon={AlertCircle} iconClassName="bg-warning/10" />
      </div>
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Siswa Kelas IX-A</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classStudents.map((student) => (
            <div key={student.id} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <p className="font-medium text-foreground">{student.name}</p>
              <p className="text-sm text-muted-foreground">NISN: {student.nisn}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};
export default WaliKelasBeranda;
