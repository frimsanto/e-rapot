import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { schedule, classes } from '@/data/mockData';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
const timeSlots = ['07:00-07:45', '07:45-09:15', '09:30-11:00', '11:00-12:30'];

const KurikulumJadwal = () => {
  const { jenjang } = useApp();
  const [selectedClass, setSelectedClass] = useState('IX-A');
  const currentClasses = classes.filter((c) => c.jenjang === jenjang);

  return (
    <AppLayout>
      <PageHeader
        title="Manajemen Jadwal"
        description="Kelola jadwal pelajaran per kelas"
        actions={
          <button className="btn-primary">
            <Plus className="h-4 w-4" />
            Tambah Jadwal
          </button>
        }
      />

      {/* Class Selector */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-foreground">Pilih Kelas:</span>
          <div className="flex flex-wrap gap-2">
            {currentClasses.map((cls) => (
              <button
                key={cls.id}
                onClick={() => setSelectedClass(cls.name)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  selectedClass === cls.name
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-foreground'
                )}
              >
                {cls.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Jadwal Kelas {selectedClass}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Waktu</th>
                {days.map((day) => (
                  <th key={day} className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, timeIndex) => (
                <tr key={time} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-sm text-foreground whitespace-nowrap">
                    {time}
                  </td>
                  {days.map((day) => {
                    const slot = schedule.find(
                      (s) => s.day === day && s.time === time && s.class === selectedClass
                    );
                    return (
                      <td key={day} className="px-2 py-2">
                        {slot ? (
                          <div className="p-2 rounded-lg bg-primary/5 border border-primary/20 group hover:bg-primary/10 transition-colors">
                            <p className="font-medium text-foreground text-sm">{slot.subject}</p>
                            <p className="text-xs text-muted-foreground">{slot.teacher}</p>
                            <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-1 rounded hover:bg-background">
                                <Edit className="h-3 w-3 text-muted-foreground" />
                              </button>
                              <button className="p-1 rounded hover:bg-background">
                                <Trash2 className="h-3 w-3 text-destructive" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button className="w-full p-3 rounded-lg border border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all">
                            <Plus className="h-4 w-4 text-muted-foreground mx-auto" />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default KurikulumJadwal;
