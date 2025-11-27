import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { attendance, monthlyAttendance } from '@/data/mockData';
import { Calendar, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';

const SiswaPresensi = () => {
  const totalDays = attendance.length;
  const hadir = attendance.filter((a) => a.status === 'hadir').length;
  const sakit = attendance.filter((a) => a.status === 'sakit').length;
  const izin = attendance.filter((a) => a.status === 'izin').length;
  const alpha = attendance.filter((a) => a.status === 'alpha').length;

  const attendancePercent = Math.round((hadir / totalDays) * 100);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'hadir':
        return { icon: CheckCircle, label: 'Hadir', className: 'bg-success/10 text-success border-success/20' };
      case 'sakit':
        return { icon: AlertCircle, label: 'Sakit', className: 'bg-warning/10 text-warning border-warning/20' };
      case 'izin':
        return { icon: Clock, label: 'Izin', className: 'bg-info/10 text-info border-info/20' };
      case 'alpha':
        return { icon: XCircle, label: 'Alpha', className: 'bg-destructive/10 text-destructive border-destructive/20' };
      default:
        return { icon: Clock, label: status, className: 'bg-muted' };
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Presensi"
        description="Rekap kehadiran semester ini"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <StatsCard
          title="Total Kehadiran"
          value={`${attendancePercent}%`}
          icon={Calendar}
          className="col-span-2 md:col-span-1"
        />
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <span className="text-sm text-muted-foreground">Hadir</span>
          </div>
          <p className="text-2xl font-bold text-success">{hadir}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-warning" />
            <span className="text-sm text-muted-foreground">Sakit</span>
          </div>
          <p className="text-2xl font-bold text-warning">{sakit}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-info" />
            <span className="text-sm text-muted-foreground">Izin</span>
          </div>
          <p className="text-2xl font-bold text-info">{izin}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="h-4 w-4 text-destructive" />
            <span className="text-sm text-muted-foreground">Alpha</span>
          </div>
          <p className="text-2xl font-bold text-destructive">{alpha}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Grafik Kehadiran Bulanan</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAttendance}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.75rem',
                  }}
                />
                <Legend />
                <Bar dataKey="hadir" name="Hadir" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sakit" name="Sakit" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="izin" name="Izin" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="alpha" name="Alpha" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Riwayat Kehadiran Terbaru</h3>
          </div>
          <div className="divide-y divide-border max-h-80 overflow-y-auto">
            {attendance.map((item, index) => {
              const status = getStatusBadge(item.status);
              const StatusIcon = status.icon;
              const date = new Date(item.date);

              return (
                <div key={index} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-center min-w-[50px]">
                      <p className="text-lg font-bold text-foreground">{date.getDate()}</p>
                      <p className="text-xs text-muted-foreground">
                        {date.toLocaleDateString('id-ID', { month: 'short' })}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {date.toLocaleDateString('id-ID', { weekday: 'long' })}
                      </p>
                      {item.note && (
                        <p className="text-sm text-muted-foreground">{item.note}</p>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className={status.className}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SiswaPresensi;
