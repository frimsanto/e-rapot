import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { useApp } from '@/contexts/AppContext';
import { teacherSchedule, classes, students } from '@/data/mockData';
import { Calendar, Users, BookOpen, ClipboardCheck, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const GuruBeranda = () => {
  const { user } = useApp();

  const todaySchedule = teacherSchedule.filter((s) => s.day === 'Senin');
  const pendingGrading = 3;
  const totalStudents = 186;

  return (
    <AppLayout>
      <PageHeader
        title={`Selamat Datang, ${user?.name?.split(' ').slice(0, 2).join(' ') || 'Guru'}!`}
        description="Kelola nilai dan pantau perkembangan siswa Anda"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Jadwal Hari Ini"
          value={todaySchedule.length}
          icon={Calendar}
          description="kelas mengajar"
        />
        <StatsCard
          title="Total Siswa"
          value={totalStudents}
          icon={Users}
          description="yang diajar"
        />
        <StatsCard
          title="Kelas Diampu"
          value={6}
          icon={BookOpen}
          description="semester ini"
        />
        <StatsCard
          title="Menunggu Input"
          value={pendingGrading}
          icon={ClipboardCheck}
          description="penilaian"
          iconClassName="bg-warning/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Jadwal Mengajar Hari Ini</h3>
            <Badge variant="outline">Senin</Badge>
          </div>
          <div className="space-y-3">
            {todaySchedule.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Tidak ada jadwal mengajar hari ini</p>
            ) : (
              todaySchedule.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-lg border transition-colors',
                    index === 0 ? 'bg-primary/5 border-primary/20' : 'border-border hover:bg-muted/30'
                  )}
                >
                  <div className="text-center min-w-[80px]">
                    <p className={cn('font-semibold', index === 0 ? 'text-primary' : 'text-foreground')}>
                      {item.time}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.subject}</p>
                    <p className="text-sm text-muted-foreground">Kelas {item.class}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{item.class}</Badge>
                    {index === 0 && (
                      <Badge className="bg-primary text-primary-foreground">Berlangsung</Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-card rounded-xl border border-border p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold text-foreground">Tugas Tertunda</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-warning/5 border border-warning/20">
              <p className="font-medium text-foreground">Input Nilai UTS</p>
              <p className="text-sm text-muted-foreground">Kelas IX-A • Matematika</p>
              <Badge variant="outline" className="mt-2 bg-warning/10 text-warning">Deadline: 3 hari</Badge>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="font-medium text-foreground">Input Nilai Tugas</p>
              <p className="text-sm text-muted-foreground">Kelas VIII-B • Matematika</p>
              <Badge variant="outline" className="mt-2">Deadline: 5 hari</Badge>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="font-medium text-foreground">Rekap Nilai UAS</p>
              <p className="text-sm text-muted-foreground">Kelas VII-A • Matematika</p>
              <Badge variant="outline" className="mt-2">Deadline: 7 hari</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Classes Overview */}
      <div className="mt-6 bg-card rounded-xl border border-border p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <h3 className="text-lg font-semibold text-foreground mb-4">Kelas yang Diampu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['VII-A', 'VII-B', 'VIII-A', 'VIII-B', 'IX-A', 'IX-B'].map((className, index) => (
            <div key={className} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">Kelas {className}</h4>
                <Badge variant="outline">{30 + index} siswa</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Matematika</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${70 + index * 5}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{70 + index * 5}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Input nilai selesai</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default GuruBeranda;
