import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/contexts/AppContext';
import { classes, students } from '@/data/mockData';
import { Plus, Edit, Eye, Users, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const KurikulumKelas = () => {
  const { jenjang } = useApp();
  const currentClasses = classes.filter((c) => c.jenjang === jenjang);

  return (
    <AppLayout>
      <PageHeader
        title="Manajemen Kelas"
        description="Kelola kelas dan wali kelas"
        actions={
          <button className="btn-primary">
            <Plus className="h-4 w-4" />
            Tambah Kelas
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Total Kelas</p>
          <p className="text-3xl font-bold text-foreground">{currentClasses.length}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Total Siswa</p>
          <p className="text-3xl font-bold text-primary">{currentClasses.reduce((sum, c) => sum + c.students, 0)}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Rata-rata/Kelas</p>
          <p className="text-3xl font-bold text-foreground">
            {Math.round(currentClasses.reduce((sum, c) => sum + c.students, 0) / currentClasses.length)}
          </p>
        </div>
      </div>

      {/* Class Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentClasses.map((cls) => (
          <div
            key={cls.id}
            className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 hover:shadow-elevated transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline">Tingkat {cls.grade}</Badge>
            </div>

            <h3 className="text-xl font-bold text-foreground mb-1">Kelas {cls.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <User className="h-4 w-4" />
              <span>Wali: {cls.homeroom}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 mb-4">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{cls.students}</p>
                <p className="text-xs text-muted-foreground">Siswa</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{Math.floor(cls.students / 2)}</p>
                <p className="text-xs text-muted-foreground">Laki-laki</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{Math.ceil(cls.students / 2)}</p>
                <p className="text-xs text-muted-foreground">Perempuan</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 btn-secondary text-sm">
                <Eye className="h-4 w-4" />
                Detail
              </button>
              <button className="btn-ghost p-2">
                <Edit className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default KurikulumKelas;
