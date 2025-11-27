import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/contexts/AppContext';
import { subjects } from '@/data/mockData';
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const KurikulumMapel = () => {
  const { jenjang } = useApp();
  const currentSubjects = subjects[jenjang];

  const jenjangColors = {
    SD: 'badge-sd',
    SMP: 'badge-smp',
    SMK: 'badge-smk',
  };

  return (
    <AppLayout>
      <PageHeader
        title="Manajemen Mata Pelajaran"
        description="Kelola daftar mata pelajaran per jenjang"
        actions={
          <button className="btn-primary">
            <Plus className="h-4 w-4" />
            Tambah Mapel
          </button>
        }
      />

      {/* Current Jenjang Info */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">Menampilkan mata pelajaran untuk:</span>
            <Badge className={cn(jenjangColors[jenjang])}>{jenjang}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{currentSubjects.length} mata pelajaran</p>
        </div>
      </div>

      {/* Subject Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentSubjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-card rounded-xl border border-border p-4 hover:border-primary/50 hover:shadow-elevated transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="outline" className="text-xs">{subject.code}</Badge>
            </div>
            <h3 className="font-semibold text-foreground mb-1">{subject.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">Kode: {subject.code}</p>
            <div className="flex items-center justify-between">
              <Badge className={cn(jenjangColors[jenjang])}>{jenjang}</Badge>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-lg hover:bg-muted">
                  <Edit className="h-4 w-4 text-muted-foreground" />
                </button>
                <button className="p-2 rounded-lg hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* All Jenjang Comparison */}
      <div className="mt-8 bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Perbandingan per Jenjang</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['SD', 'SMP', 'SMK'] as const).map((j) => (
            <div key={j} className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={cn(jenjangColors[j])}>{j}</Badge>
                <span className="text-sm text-muted-foreground">{subjects[j].length} mapel</span>
              </div>
              <div className="space-y-1">
                {subjects[j].slice(0, 5).map((s) => (
                  <p key={s.id} className="text-sm text-foreground">{s.name}</p>
                ))}
                {subjects[j].length > 5 && (
                  <p className="text-sm text-muted-foreground">+{subjects[j].length - 5} lainnya</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default KurikulumMapel;
