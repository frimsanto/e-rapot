import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Briefcase } from 'lucide-react';
import { api } from '@/services/api';

type PKLItem = {
  id: string;
  studentName: string;
  company: string;
  supervisor: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
  score: number | null;
};

const SiswaPKL = () => {
  const [items, setItems] = useState<PKLItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get<{ data: PKLItem[] }>(`/pkl`);
        setItems(res.data ?? []);
      } catch (e: any) {
        setError(e?.message ?? 'Gagal memuat data PKL');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <AppLayout>
      <PageHeader
        title="PKL / Prakerin"
        description="Informasi penempatan dan progres Praktik Kerja Lapangan untuk jenjang SMK"
      />
      {loading && (
        <div className="text-sm text-muted-foreground">Memuat data PKL dari server...</div>
      )}
      {error && !loading && (
        <div className="text-sm text-destructive mb-3">{error}</div>
      )}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-card rounded-xl border border-border p-4 flex items-start justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">{item.company}</h3>
              </div>
              <p className="text-sm text-muted-foreground">Pembimbing: {item.supervisor}</p>
              <p className="text-xs text-muted-foreground">Periode: {item.startDate} - {item.endDate}</p>
            </div>
            <div className="text-right space-y-2">
              <Badge variant="outline" className="text-xs">
                {item.status === 'active' && 'Sedang berlangsung'}
                {item.status === 'completed' && 'Selesai'}
              </Badge>
              {item.score !== null && (
                <p className="text-sm font-semibold text-foreground">Nilai: {item.score}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default SiswaPKL;
