import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const classGrades = [
  { class: 'VII-A', avgGrade: 78.5, students: 32, passed: 30, failed: 2 },
  { class: 'VII-B', avgGrade: 76.2, students: 30, passed: 28, failed: 2 },
  { class: 'VIII-A', avgGrade: 82.1, students: 31, passed: 31, failed: 0 },
  { class: 'VIII-B', avgGrade: 79.8, students: 32, passed: 30, failed: 2 },
  { class: 'IX-A', avgGrade: 85.3, students: 30, passed: 30, failed: 0 },
  { class: 'IX-B', avgGrade: 81.7, students: 31, passed: 29, failed: 2 },
];

const chartData = classGrades.map((c) => ({
  name: c.class,
  'Rata-rata': c.avgGrade,
  Tuntas: c.passed,
  'Tidak Tuntas': c.failed,
}));

const GuruRekapNilai = () => {
  const totalAvg = (classGrades.reduce((sum, c) => sum + c.avgGrade, 0) / classGrades.length).toFixed(1);
  const totalPassed = classGrades.reduce((sum, c) => sum + c.passed, 0);
  const totalFailed = classGrades.reduce((sum, c) => sum + c.failed, 0);

  return (
    <AppLayout>
      <PageHeader
        title="Rekap Nilai"
        description="Ringkasan nilai seluruh kelas yang Anda ampu"
        actions={
          <button className="btn-secondary">
            <Download className="h-4 w-4" />
            Export
          </button>
        }
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Rata-rata Keseluruhan</p>
          <p className="text-3xl font-bold text-primary">{totalAvg}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Total Siswa</p>
          <p className="text-3xl font-bold text-foreground">{totalPassed + totalFailed}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Siswa Tuntas</p>
          <p className="text-3xl font-bold text-success">{totalPassed}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Perlu Perhatian</p>
          <p className="text-3xl font-bold text-destructive">{totalFailed}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Grafik Rata-rata per Kelas</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
                <Bar dataKey="Rata-rata" fill="hsl(221, 83%, 53%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Class List */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Detail per Kelas</h3>
          </div>
          <div className="divide-y divide-border">
            {classGrades.map((cls, index) => (
              <div key={cls.class} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">{cls.class}</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{cls.students} siswa</p>
                    <p className="text-sm text-muted-foreground">Matematika</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={cn(
                      'text-lg font-bold',
                      cls.avgGrade >= 80 ? 'text-success' : cls.avgGrade >= 70 ? 'text-primary' : 'text-warning'
                    )}>
                      {cls.avgGrade}
                    </p>
                    <p className="text-xs text-muted-foreground">rata-rata</p>
                  </div>
                  {cls.avgGrade >= 80 ? (
                    <TrendingUp className="h-5 w-5 text-success" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-warning" />
                  )}
                  <Badge variant="outline" className={cn(
                    cls.failed === 0 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                  )}>
                    {cls.passed}/{cls.students} tuntas
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GuruRekapNilai;
