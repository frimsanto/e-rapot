import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/contexts/AppContext';
import { grades, subjects } from '@/data/mockData';
import { BookOpen, Eye, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const SiswaNilai = () => {
  const { jenjang } = useApp();
  const currentSubjects = subjects[jenjang];
  const [selectedGrade, setSelectedGrade] = useState<typeof grades[0] | null>(null);

  const getGradeColor = (value: number) => {
    if (value >= 85) return 'text-success';
    if (value >= 75) return 'text-primary';
    if (value >= 65) return 'text-warning';
    return 'text-destructive';
  };

  const getGradeBadge = (value: number) => {
    if (value >= 85) return { label: 'A', className: 'bg-success/10 text-success border-success/20' };
    if (value >= 75) return { label: 'B', className: 'bg-primary/10 text-primary border-primary/20' };
    if (value >= 65) return { label: 'C', className: 'bg-warning/10 text-warning border-warning/20' };
    return { label: 'D', className: 'bg-destructive/10 text-destructive border-destructive/20' };
  };

  const getTrend = (grade: typeof grades[0]) => {
    const diff = grade.uas - grade.uts;
    if (diff > 2) return { icon: TrendingUp, className: 'text-success' };
    if (diff < -2) return { icon: TrendingDown, className: 'text-destructive' };
    return { icon: Minus, className: 'text-muted-foreground' };
  };

  const avgGrade = Math.round(grades.reduce((sum, g) => sum + g.final, 0) / grades.length);

  return (
    <AppLayout>
      <PageHeader
        title="Nilai Akademik"
        description="Lihat detail nilai per mata pelajaran"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Rata-rata</p>
          <p className={cn('text-3xl font-bold', getGradeColor(avgGrade))}>{avgGrade}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Nilai Tertinggi</p>
          <p className="text-3xl font-bold text-success">{Math.max(...grades.map(g => g.final))}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Nilai Terendah</p>
          <p className="text-3xl font-bold text-warning">{Math.min(...grades.map(g => g.final))}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Mata Pelajaran</p>
          <p className="text-3xl font-bold text-foreground">{grades.length}</p>
        </div>
      </div>

      {/* Grade Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Daftar Nilai Semester Genap 2023/2024</h3>
          <Badge variant="outline" className={cn(
            jenjang === 'SD' ? 'badge-sd' : jenjang === 'SMP' ? 'badge-smp' : 'badge-smk'
          )}>
            {jenjang}
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Mata Pelajaran</th>
                <th className="text-center">Tugas</th>
                <th className="text-center">Ulangan</th>
                <th className="text-center">UTS</th>
                <th className="text-center">UAS</th>
                <th className="text-center">Nilai Akhir</th>
                <th className="text-center">Predikat</th>
                <th className="text-center">Trend</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade, index) => {
                const subject = currentSubjects.find(s => s.id === grade.subjectId);
                const gradeBadge = getGradeBadge(grade.final);
                const trend = getTrend(grade);
                const TrendIcon = trend.icon;

                return (
                  <tr key={grade.subjectId}>
                    <td className="font-medium">{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{subject?.name || 'Mata Pelajaran'}</p>
                          <p className="text-xs text-muted-foreground">{subject?.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center font-medium">{grade.tugas}</td>
                    <td className="text-center font-medium">{grade.ulangan}</td>
                    <td className="text-center font-medium">{grade.uts}</td>
                    <td className="text-center font-medium">{grade.uas}</td>
                    <td className="text-center">
                      <span className={cn('text-lg font-bold', getGradeColor(grade.final))}>
                        {grade.final}
                      </span>
                    </td>
                    <td className="text-center">
                      <Badge variant="outline" className={gradeBadge.className}>
                        {gradeBadge.label}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <TrendIcon className={cn('h-5 w-5 mx-auto', trend.className)} />
                    </td>
                    <td className="text-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <button
                            onClick={() => setSelectedGrade(grade)}
                            className="btn-ghost p-2"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Detail Nilai - {subject?.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 rounded-lg bg-muted/50">
                                <p className="text-sm text-muted-foreground">Tugas</p>
                                <p className="text-2xl font-bold text-foreground">{grade.tugas}</p>
                              </div>
                              <div className="p-4 rounded-lg bg-muted/50">
                                <p className="text-sm text-muted-foreground">Ulangan Harian</p>
                                <p className="text-2xl font-bold text-foreground">{grade.ulangan}</p>
                              </div>
                              <div className="p-4 rounded-lg bg-muted/50">
                                <p className="text-sm text-muted-foreground">UTS</p>
                                <p className="text-2xl font-bold text-foreground">{grade.uts}</p>
                              </div>
                              <div className="p-4 rounded-lg bg-muted/50">
                                <p className="text-sm text-muted-foreground">UAS</p>
                                <p className="text-2xl font-bold text-foreground">{grade.uas}</p>
                              </div>
                            </div>
                            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                              <p className="text-sm text-muted-foreground">Nilai Akhir</p>
                              <div className="flex items-center justify-between">
                                <p className={cn('text-3xl font-bold', getGradeColor(grade.final))}>
                                  {grade.final}
                                </p>
                                <Badge variant="outline" className={getGradeBadge(grade.final).className}>
                                  Predikat {getGradeBadge(grade.final).label}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Formula: (Tugas × 20%) + (Ulangan × 20%) + (UTS × 30%) + (UAS × 30%)
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default SiswaNilai;
