import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { api } from '@/services/api';

type EkskulItem = {
  id: string;
  name: string;
  coach: string;
  schedule: string;
  members: number;
};

const SiswaEkstrakurikuler = () => {
  const [items, setItems] = useState<EkskulItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get<{ data: EkskulItem[] }>(`/ekskul`);
        setItems(res.data ?? []);
      } catch (e: any) {
        setError(e?.message ?? 'Gagal memuat data ekstrakurikuler');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <AppLayout>
      <PageHeader
        title="Ekstrakurikuler"
        description="Daftar kegiatan ekstrakurikuler jenjang SMP yang diikuti dan tersedia"
      />
      {loading && (
        <div className="text-sm text-muted-foreground">Memuat data ekstrakurikuler dari server...</div>
      )}
      {error && !loading && (
        <div className="text-sm text-destructive mb-3">{error}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-card rounded-xl border border-border p-4 hover:border-primary/50 hover:shadow-elevated transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground">Pelatih: {item.coach}</p>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Users className="h-3 w-3 mr-1" />
                {item.members} siswa
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Jadwal: {item.schedule}</p>
            <button className="btn-secondary text-xs">Lihat Detail</button>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default SiswaEkstrakurikuler;
