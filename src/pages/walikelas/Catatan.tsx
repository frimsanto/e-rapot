import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { studentNotes } from '@/data/mockData';
import { Plus, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const WaliKelasCatatan = () => {
  const typeColors: Record<string, string> = { behavior: 'bg-info/10 text-info', achievement: 'bg-success/10 text-success', concern: 'bg-warning/10 text-warning' };
  const typeLabels: Record<string, string> = { behavior: 'Sikap', achievement: 'Prestasi', concern: 'Perhatian' };
  return (
    <AppLayout>
      <PageHeader title="Catatan Siswa" description="Catatan perkembangan dan perilaku siswa" actions={<button className="btn-primary"><Plus className="h-4 w-4"/>Tambah Catatan</button>} />
      <div className="space-y-4">
        {studentNotes.map((note) => (
          <div key={note.id} className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{note.studentName}</p>
                  <p className="text-sm text-muted-foreground">{new Date(note.date).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
              <Badge variant="outline" className={cn(typeColors[note.type])}>{typeLabels[note.type]}</Badge>
            </div>
            <p className="text-foreground ml-8">{note.note}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};
export default WaliKelasCatatan;
