import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Badge } from '@/components/ui/badge';
import { ClipboardList } from 'lucide-react';
import { api } from '@/services/api';

type P5Project = {
  id: string;
  name: string;
  theme: string;
  status: 'completed' | 'ongoing' | 'planned';
  score: number | null;
};

const SiswaP5 = () => {
  const [projects, setProjects] = useState<P5Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get<{ data: P5Project[] }>(`/p5`);
        setProjects(res.data ?? []);
      } catch (e: any) {
        setError(e?.message ?? 'Gagal memuat data P5');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <AppLayout>
      <PageHeader
        title="Projek P5"
        description="Portofolio projek Penguatan Profil Pelajar Pancasila untuk jenjang SMP"
      />
      {loading && (
        <div className="text-sm text-muted-foreground">Memuat data projek P5 dari server...</div>
      )}
      {error && !loading && (
        <div className="text-sm text-destructive mb-3">{error}</div>
      )}
      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-card rounded-xl border border-border p-4 flex items-start justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ClipboardList className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">{project.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">Tema: {project.theme}</p>
            </div>
            <div className="text-right space-y-2">
              <Badge variant="outline" className="text-xs">
                {project.status === 'completed' && 'Selesai'}
                {project.status === 'ongoing' && 'Berjalan'}
                {project.status === 'planned' && 'Direncanakan'}
              </Badge>
              {project.score !== null && (
                <p className="text-sm font-semibold text-foreground">Nilai: {project.score}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default SiswaP5;
