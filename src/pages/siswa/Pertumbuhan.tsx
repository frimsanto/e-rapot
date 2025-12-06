import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { growthNotes, behaviorNotes } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';

const chartData = growthNotes.map((g) => ({ date: g.date, height: g.height, weight: g.weight }));

const SiswaPertumbuhan = () => {
  return (
    <AppLayout>
      <PageHeader
        title="Perkembangan Pertumbuhan & Perilaku"
        description="Visualisasi tinggi badan, berat badan, dan catatan perilaku untuk jenjang SD"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Grafik Pertumbuhan</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem' }} />
                <Line yAxisId="left" type="monotone" dataKey="height" stroke="hsl(221,83%,53%)" strokeWidth={2} name="Tinggi (cm)" />
                <Line yAxisId="right" type="monotone" dataKey="weight" stroke="hsl(142,76%,36%)" strokeWidth={2} name="Berat (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Ringkasan Perilaku</h3>
          <div className="space-y-3">
            {behaviorNotes.map((note) => (
              <div key={note.id} className="p-3 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-foreground">{note.aspect}</p>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">{note.grade}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{note.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SiswaPertumbuhan;
