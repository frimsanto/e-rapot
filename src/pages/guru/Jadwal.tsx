import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { teacherSchedule } from '@/data/mockData';
import { Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];

const GuruJadwal = () => {
  return (
    <AppLayout>
      <PageHeader
        title="Jadwal Mengajar"
        description="Jadwal mengajar mingguan Anda"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {days.map((day) => {
          const daySchedule = teacherSchedule.filter((s) => s.day === day);
          const isToday = day === 'Senin';

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
                    <Badge className="bg-primary text-primary-foreground text-xs">Hari Ini</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{daySchedule.length} kelas</p>
              </div>

              <div className="p-3 space-y-2">
                {daySchedule.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Tidak ada jadwal</p>
                ) : (
                  daySchedule.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Clock className="h-3 w-3" />
                        <span>{item.time}</span>
                      </div>
                      <p className="font-medium text-foreground text-sm">{item.subject}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Users className="h-3 w-3" />
                        <span>Kelas {item.class}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 bg-card rounded-xl border border-border p-6">
        <h4 className="font-semibold text-foreground mb-4">Ringkasan Mingguan</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-3xl font-bold text-primary">{teacherSchedule.length}</p>
            <p className="text-sm text-muted-foreground">Total Jam Mengajar</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-3xl font-bold text-foreground">6</p>
            <p className="text-sm text-muted-foreground">Kelas Berbeda</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-3xl font-bold text-foreground">186</p>
            <p className="text-sm text-muted-foreground">Total Siswa</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-3xl font-bold text-foreground">1</p>
            <p className="text-sm text-muted-foreground">Mata Pelajaran</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GuruJadwal;
