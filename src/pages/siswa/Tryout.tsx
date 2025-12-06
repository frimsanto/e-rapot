import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Badge } from '@/components/ui/badge';

const mockTryout = [
  { id: '1', name: 'Tryout UTBK 1', date: '2024-02-10', type: 'TPS', score: 620, target: 650 },
  { id: '2', name: 'Tryout UTBK 2', date: '2024-03-10', type: 'TPS', score: 640, target: 650 },
  { id: '3', name: 'Simulasi SNBT IPA', date: '2024-04-05', type: 'TKA-IPA', score: 610, target: 650 },
];

const SiswaTryout = () => {
  return (
    <AppLayout>
      <PageHeader
        title="Tryout & Kelulusan"
        description="Pantau hasil tryout dan kesiapan kelulusan SMA Anda."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ringkasan */}
        <div className="lg:col-span-1 bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Ringkasan Kesiapan</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Jumlah Tryout</span>
              <span className="font-medium text-foreground">{mockTryout.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Skor Terbaik</span>
              <span className="font-medium text-foreground">{Math.max(...mockTryout.map(t => t.score))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status Kelulusan</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">On Track</Badge>
            </div>
          </div>
        </div>

        {/* Detail Tryout */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Riwayat Tryout</h3>
          <div className="space-y-2 text-sm">
            {mockTryout.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                <div>
                  <p className="font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.date} • {t.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">Skor: {t.score}</p>
                  <p className="text-xs text-muted-foreground">Target: {t.target}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SiswaTryout;
