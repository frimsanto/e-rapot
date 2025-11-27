import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { schedule } from '@/data/mockData';
import { Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

const SiswaJadwal = () => {
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long' });

  return (
    <AppLayout>
      <PageHeader
        title="Jadwal Kelas"
        description="Jadwal pelajaran mingguan Kelas IX-A"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {days.map((day) => {
          const daySchedule = schedule.filter((s) => s.day === day);
          const isToday = day === 'Senin'; // Simulated

          return (
            <div
              key={day}
              className={cn(
                'bg-card rounded-xl border overflow-hidden transition-all',
                isToday ? 'border-primary shadow-elevated ring-2 ring-primary/20' : 'border-border'
              )}
            >
              <div
                className={cn(
                  'p-4 border-b',
                  isToday ? 'bg-primary/10 border-primary/20' : 'bg-muted/50 border-border'
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className={cn('font-semibold', isToday ? 'text-primary' : 'text-foreground')}>
                    {day}
                  </h3>
                  {isToday && (
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      Hari Ini
                    </Badge>
                  )}
                </div>
              </div>

              <div className="p-3 space-y-2">
                {daySchedule.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Tidak ada jadwal
                  </p>
                ) : (
                  daySchedule.map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        'p-3 rounded-lg border transition-colors',
                        item.subject === 'Upacara'
                          ? 'bg-warning/5 border-warning/20'
                          : 'bg-background border-border hover:bg-muted/30'
                      )}
                    >
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Clock className="h-3 w-3" />
                        <span>{item.time}</span>
                      </div>
                      <p className="font-medium text-foreground text-sm">{item.subject}</p>
                      {item.teacher !== '-' && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <User className="h-3 w-3" />
                          <span>{item.teacher}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 bg-card rounded-xl border border-border p-4">
        <h4 className="font-semibold text-foreground mb-3">Keterangan</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-primary" />
            <span className="text-sm text-muted-foreground">Hari ini</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-warning" />
            <span className="text-sm text-muted-foreground">Kegiatan khusus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-border" />
            <span className="text-sm text-muted-foreground">Pelajaran reguler</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SiswaJadwal;
