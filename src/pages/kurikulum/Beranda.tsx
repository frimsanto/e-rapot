import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { useApp } from '@/contexts/AppContext';
import { classes, subjects } from '@/data/mockData';
import { Calendar, Users, BookOpen, UserCheck, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const KurikulumBeranda = () => {
  const { jenjang, user } = useApp();
  const currentSubjects = subjects[jenjang];
  const currentClasses = classes.filter((c) => c.jenjang === jenjang);

  const pieData = [
    { name: 'Jadwal Terisi', value: 85, color: 'hsl(221, 83%, 53%)' },
    { name: 'Belum Terisi', value: 15, color: 'hsl(var(--muted))' },
  ];

  return (
    <AppLayout>
      <PageHeader
        title={`Selamat Datang, ${user?.name?.split(' ')[0] || 'Pak Bambang'}!`}
        description="Kelola kurikulum dan jadwal pembelajaran"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Kelas"
          value={currentClasses.length}
          icon={Users}
          description={`Jenjang ${jenjang}`}
        />
        <StatsCard
          title="Mata Pelajaran"
          value={currentSubjects.length}
          icon={BookOpen}
          description="aktif"
        />
        <StatsCard
          title="Total Guru"
          value={52}
          icon={UserCheck}
          description="pengampu"
        />
        <StatsCard
          title="Jadwal Terisi"
          value="85%"
          icon={Calendar}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule Overview */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Ringkasan Jadwal</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentClasses.slice(0, 6).map((cls) => (
              <div key={cls.id} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">{cls.name}</span>
                  <span className="text-xs text-muted-foreground">{cls.students} siswa</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Wali: {cls.homeroom}</p>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '85%' }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">85% jadwal terisi</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Status Jadwal</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left">
            <Calendar className="h-6 w-6 text-primary mb-2" />
            <p className="font-medium text-foreground">Kelola Jadwal</p>
            <p className="text-sm text-muted-foreground">Atur jadwal pelajaran</p>
          </button>
          <button className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left">
            <BookOpen className="h-6 w-6 text-primary mb-2" />
            <p className="font-medium text-foreground">Mata Pelajaran</p>
            <p className="text-sm text-muted-foreground">Kelola mapel</p>
          </button>
          <button className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left">
            <Users className="h-6 w-6 text-primary mb-2" />
            <p className="font-medium text-foreground">Kelas</p>
            <p className="text-sm text-muted-foreground">Kelola kelas</p>
          </button>
          <button className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left">
            <UserCheck className="h-6 w-6 text-primary mb-2" />
            <p className="font-medium text-foreground">Guru Pengampu</p>
            <p className="text-sm text-muted-foreground">Mapping guru</p>
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default KurikulumBeranda;
