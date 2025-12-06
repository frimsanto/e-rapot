import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { useApp } from '@/contexts/AppContext';
import { BookOpen, Trophy, Calendar, TrendingUp, Clock, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { api } from '@/services/api';

const SiswaBeranda = () => {
  const { user, jenjang } = useApp();
  type Subject = { id: string; name: string; code: string };
  type Grade = { subjectId: string; final: number };

  const [subjectsState, setSubjectsState] = useState<Subject[]>([]);
  const [gradesState, setGradesState] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const mapelRes = await api.get<{ data: any[] }>(`/mapel?jenjang=${jenjang}`);
        const subjectsFromApi: Subject[] = mapelRes.data.map((m) => ({
          id: String(m.idMapel ?? m.id_mapel ?? m.id),
          name: m.namaMapel ?? m.nama_mapel ?? m.name,
          code: m.kodeMapel ?? m.kode_mapel ?? m.code,
        }));

        const nilaiRes = await api.get<{ data: any[] }>(`/nilai/akhir?idSiswa=1&idSemester=2`);
        const gradesFromApi: Grade[] = nilaiRes.data.map((n) => ({
          subjectId: String(
            n.idMapel ?? n.id_mapel ?? n.mapelId ?? n.mapel?.idMapel ?? n.mapel?.id,
          ),
          final: Number(n.skorAkhir ?? n.skor_akhir ?? n.final ?? 0),
        }));

        setSubjectsState(subjectsFromApi);
        setGradesState(gradesFromApi);
      } catch (e: any) {
        setError(e?.message ?? 'Gagal memuat ringkasan nilai');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [jenjang]);

  const avgGrade = gradesState.length
    ? Math.round(gradesState.reduce((sum, g) => sum + g.final, 0) / gradesState.length)
    : 0;

  const bestGrade = gradesState.length
    ? gradesState.slice().sort((a, b) => b.final - a.final)[0]
    : null;
  const bestSubject = bestGrade
    ? subjectsState.find((s) => s.id === bestGrade.subjectId) ?? null
    : null;

  const gradeProgressionData = [
    {
      semester: 'Genap 2023/2024',
      average: avgGrade,
    },
  ];
  const upcomingSchedule = [
    { time: '07:45', subject: 'Matematika', teacher: 'Pak Agus' },
    { time: '09:30', subject: 'Bahasa Indonesia', teacher: 'Ibu Sri' },
    { time: '11:00', subject: 'IPA', teacher: 'Pak Bambang' },
  ];

  return (
    <AppLayout>
      <PageHeader
        title={`Selamat Datang, ${user?.name?.split(' ')[0] || 'Siswa'}!`}
        description="Pantau perkembangan belajar dan nilai akademik Anda"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Rata-rata Nilai"
          value={avgGrade}
          icon={Trophy}
          trend={{ value: 3.2, isPositive: true }}
        />
        <StatsCard
          title="Mata Pelajaran"
          value={subjectsState.length}
          icon={BookOpen}
          description="Semester ini"
        />
        <StatsCard
          title="Kehadiran"
          value="95%"
          icon={Calendar}
          trend={{ value: 1.5, isPositive: true }}
        />
        <StatsCard
          title="Peringkat Kelas"
          value="5"
          icon={Target}
          description="dari 30 siswa"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grade Progression Chart */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Perkembangan Nilai</h3>
              <p className="text-sm text-muted-foreground">Rata-rata nilai per semester</p>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              <TrendingUp className="h-3 w-3 mr-1" />
              Meningkat
            </Badge>
          </div>
          <div className="h-64">
            {loading && (
              <p className="text-sm text-muted-foreground mb-2">Memuat data nilai dari server...</p>
            )}
            {error && !loading && (
              <p className="text-sm text-destructive mb-2">{error}</p>
            )}
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gradeProgressionData}>
                <defs>
                  <linearGradient id="colorGrade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="semester" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis domain={[70, 100]} className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="average"
                  stroke="hsl(221, 83%, 53%)"
                  strokeWidth={2}
                  fill="url(#colorGrade)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-xl border border-border p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-lg font-semibold text-foreground mb-4">Profil Siswa</h3>
          <div className="flex flex-col items-center text-center mb-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-primary">AF</span>
            </div>
            <h4 className="font-semibold text-foreground">{user?.name || 'Ahmad Fauzi'}</h4>
            <p className="text-sm text-muted-foreground">NISN: 0012345678</p>
            <Badge variant="outline" className={cn('mt-2', jenjang === 'SD' ? 'badge-sd' : jenjang === 'SMP' ? 'badge-smp' : 'badge-smk')}>
              Kelas IX-A • {jenjang}
            </Badge>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Wali Kelas</span>
              <span className="font-medium text-foreground">Ibu Dewi Sartika</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tahun Ajaran</span>
              <span className="font-medium text-foreground">2023/2024</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Semester</span>
              <span className="font-medium text-foreground">Genap</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Today's Schedule */}
        <div className="bg-card rounded-xl border border-border p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Jadwal Hari Ini</h3>
          </div>
          <div className="space-y-3">
            {upcomingSchedule.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center gap-4 p-3 rounded-lg transition-colors',
                  index === 0 ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted/50'
                )}
              >
                <div className="text-center min-w-[60px]">
                  <p className={cn('text-sm font-semibold', index === 0 ? 'text-primary' : 'text-foreground')}>
                    {item.time}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.subject}</p>
                  <p className="text-sm text-muted-foreground">{item.teacher}</p>
                </div>
                {index === 0 && (
                  <Badge className="bg-primary text-primary-foreground">Berlangsung</Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Best Subjects */}
        <div className="bg-card rounded-xl border border-border p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-warning" />
            <h3 className="text-lg font-semibold text-foreground">Nilai Tertinggi</h3>
          </div>
          <div className="space-y-3">
            {gradesState
              .slice(0, 5)
              .sort((a, b) => b.final - a.final)
              .map((grade, index) => {
                const subject = subjectsState.find((s) => s.id === grade.subjectId);
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold',
                      index === 0 ? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'
                    )}>
                      {index + 1}
                    </div>
                    <span className="font-medium text-foreground">{subject?.name || 'Mata Pelajaran'}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      grade.final >= 85
                        ? 'bg-success/10 text-success border-success/20'
                        : 'bg-muted',
                    )}
                  >
                    {grade.final}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Jenjang-specific content */}
      {jenjang === 'SD' && (
        <div className="mt-6 bg-card rounded-xl border border-border p-6 animate-slide-up">
          <h3 className="text-lg font-semibold text-foreground mb-4">📝 Catatan Perkembangan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-success/5 border border-success/20">
              <p className="font-medium text-success mb-1">Sikap Spiritual</p>
              <p className="text-sm text-muted-foreground">Rajin beribadah dan berdoa sebelum belajar</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="font-medium text-primary mb-1">Sikap Sosial</p>
              <p className="text-sm text-muted-foreground">Suka menolong teman dan sopan</p>
            </div>
            <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
              <p className="font-medium text-warning mb-1">Pertumbuhan</p>
              <p className="text-sm text-muted-foreground">Tinggi: 135cm, Berat: 32kg</p>
            </div>
          </div>
        </div>
      )}

      {jenjang === 'SMP' && (
        <div className="mt-6 bg-card rounded-xl border border-border p-6 animate-slide-up">
          <h3 className="text-lg font-semibold text-foreground mb-4">🎯 Proyek P5 & Ekstrakurikuler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <Badge className="bg-primary text-primary-foreground mb-2">Proyek P5</Badge>
              <p className="font-medium text-foreground">Kearifan Lokal</p>
              <p className="text-sm text-muted-foreground">Tema: Bhinneka Tunggal Ika</p>
              <Badge variant="outline" className="mt-2 bg-success/10 text-success">Selesai - Nilai: 88</Badge>
            </div>
            <div className="p-4 rounded-lg bg-info/5 border border-info/20">
              <Badge className="bg-info text-info-foreground mb-2">Ekstrakurikuler</Badge>
              <p className="font-medium text-foreground">English Club</p>
              <p className="text-sm text-muted-foreground">Selasa, 15:00-17:00</p>
              <Badge variant="outline" className="mt-2">Aktif</Badge>
            </div>
          </div>
        </div>
      )}

      {jenjang === 'SMK' && (
        <div className="mt-6 bg-card rounded-xl border border-border p-6 animate-slide-up">
          <h3 className="text-lg font-semibold text-foreground mb-4">🏢 PKL & UKK</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <Badge className="bg-primary text-primary-foreground mb-2">PKL/Prakerin</Badge>
              <p className="font-medium text-foreground">PT. Telkom Indonesia</p>
              <p className="text-sm text-muted-foreground">15 Jan - 15 Apr 2024</p>
              <Badge variant="outline" className="mt-2 bg-warning/10 text-warning">Sedang Berlangsung</Badge>
            </div>
            <div className="p-4 rounded-lg bg-info/5 border border-info/20">
              <Badge className="bg-info text-info-foreground mb-2">UKK</Badge>
              <p className="font-medium text-foreground">Instalasi Jaringan Komputer</p>
              <p className="text-sm text-muted-foreground">15 April 2024, 8 jam</p>
              <Badge variant="outline" className="mt-2">Terjadwal</Badge>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default SiswaBeranda;
