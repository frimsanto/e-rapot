import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { schoolKPIs, classSummary } from '@/data/mockData';
import { Users, GraduationCap, TrendingUp, Award, Calendar, Target } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';

const chartData = [{ month: 'Jan', nilai: 78 },{ month: 'Feb', nilai: 80 },{ month: 'Mar', nilai: 82 },{ month: 'Apr', nilai: 81 },{ month: 'May', nilai: 84 },{ month: 'Jun', nilai: 86 }];

const KepalaSekolahBeranda = () => (
  <AppLayout>
    <PageHeader title="Dashboard Kepala Sekolah" description="Monitoring performa sekolah" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatsCard title="Total Siswa" value={schoolKPIs.totalStudents} icon={Users} trend={{ value: 5, isPositive: true }} />
      <StatsCard title="Total Guru" value={schoolKPIs.totalTeachers} icon={GraduationCap} />
      <StatsCard title="Rata-rata Nilai" value={schoolKPIs.averageGrade} icon={TrendingUp} trend={{ value: 2.3, isPositive: true }} />
      <StatsCard title="Kelulusan" value={`${schoolKPIs.graduationRate}%`} icon={Award} />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Tren Nilai Sekolah</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs><linearGradient id="colorNilai" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.2}/><stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis domain={[70, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem' }} />
              <Area type="monotone" dataKey="nilai" stroke="hsl(221, 83%, 53%)" strokeWidth={2} fill="url(#colorNilai)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Ringkasan Kelas</h3>
        <div className="space-y-3">
          {classSummary.slice(0, 5).map((cls) => (
            <div key={cls.class} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30">
              <div><p className="font-medium">{cls.class}</p><p className="text-sm text-muted-foreground">{cls.totalStudents} siswa</p></div>
              <div className="flex items-center gap-3">
                <Badge variant="outline">{cls.avgGrade.toFixed(1)}</Badge>
                {cls.atRisk > 0 && <Badge variant="outline" className="bg-warning/10 text-warning">{cls.atRisk} perhatian</Badge>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </AppLayout>
);
export default KepalaSekolahBeranda;
