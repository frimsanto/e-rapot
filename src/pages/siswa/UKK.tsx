import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar } from 'lucide-react';
import { api } from '@/services/api';

type UKKItem = {
  id: string;
  name: string;
  date: string;
  duration: string;
  status: 'scheduled' | 'completed';
  score: number | null;
};

const SiswaUKK = () => {
  const [items, setItems] = useState<UKKItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get<{ data: UKKItem[] }>(`/ukk`);
        setItems(res.data ?? []);
      } catch (e: any) {
        setError(e?.message ?? 'Gagal memuat data UKK');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <AppLayout>
      <PageHeader
        title="Uji Kompetensi Keahlian (UKK)"
        description="Jadwal dan status pelaksanaan UKK untuk jenjang SMK"
      />
      {loading && (
        <div className="text-sm text-muted-foreground">Memuat data UKK dari server...</div>
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
                <Award className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">{item.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {item.date} • {item.duration}
              </p>
            </div>
            <div className="text-right space-y-2">
              <Badge variant="outline" className="text-xs">
                {item.status === 'scheduled' && 'Terjadwal'}
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

export default SiswaUKK;
