import { useEffect, useMemo, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Save, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { api } from '@/services/api';

const GuruPresensi = () => {
  const [selectedClass, setSelectedClass] = useState('IX-A');
  const [studentsState, setStudentsState] = useState<
    { id: string; name: string; nisn: string; gender: string; className?: string }[]
  >([]);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get<{ data: any[] }>(`/siswa`);
        const siswaFromApi = res.data.map((s) => ({
          id: String(s.idSiswa ?? s.id_siswa ?? s.id),
          name: s.namaLengkap ?? s.nama_lengkap ?? s.nama ?? s.name,
          nisn: s.nisn ?? '-',
          gender: s.jenisKelamin ?? s.jenis_kelamin ?? s.gender ?? 'L',
          className: s.kelas?.namaKelas ?? s.kelas?.nama_kelas ?? s.className ?? s.class ?? '',
        }));

        setStudentsState(siswaFromApi);
      } catch (e: any) {
        setError(e?.message ?? 'Gagal memuat data siswa');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const classStudents = useMemo(
    () => studentsState.filter((s) => s.className === selectedClass),
    [studentsState, selectedClass],
  );

  useEffect(() => {
    const initial: Record<string, string> = {};
    classStudents.forEach((s) => {
      initial[s.id] = 'hadir';
    });
    setAttendance(initial);
  }, [classStudents]);

  const classes = ['VII-A', 'VII-B', 'VIII-A', 'VIII-B', 'IX-A', 'IX-B'];
  const statuses = [
    { value: 'hadir', label: 'Hadir', icon: CheckCircle, color: 'text-success' },
    { value: 'sakit', label: 'Sakit', icon: AlertCircle, color: 'text-warning' },
    { value: 'izin', label: 'Izin', icon: Clock, color: 'text-info' },
    { value: 'alpha', label: 'Alpha', icon: XCircle, color: 'text-destructive' },
  ];

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const summary = {
    hadir: Object.values(attendance).filter((s) => s === 'hadir').length,
    sakit: Object.values(attendance).filter((s) => s === 'sakit').length,
    izin: Object.values(attendance).filter((s) => s === 'izin').length,
    alpha: Object.values(attendance).filter((s) => s === 'alpha').length,
  };

  return (
    <AppLayout>
      <PageHeader
        title="Presensi Kelas"
        description="Input presensi harian siswa"
        actions={
          <button className="btn-primary">
            <Save className="h-4 w-4" />
            Simpan Presensi
          </button>
        }
      />

      {/* Class Selector */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-foreground">Pilih Kelas:</span>
          <div className="flex gap-2">
            {classes.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  selectedClass === cls
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80 text-foreground'
                )}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statuses.map((status) => {
          const StatusIcon = status.icon;
          return (
            <div key={status.value} className="stat-card">
              <div className="flex items-center gap-2 mb-2">
                <StatusIcon className={cn('h-4 w-4', status.color)} />
                <span className="text-sm text-muted-foreground">{status.label}</span>
              </div>
              <p className={cn('text-2xl font-bold', status.color)}>
                {summary[status.value as keyof typeof summary]}
              </p>
            </div>
          );
        })}
      </div>

      {/* Attendance Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Presensi Kelas {selectedClass}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <Badge variant="outline">{classStudents.length} siswa</Badge>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>NISN</th>
                <th>Nama Siswa</th>
                <th>L/P</th>
                <th className="text-center">Status Kehadiran</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.map((student, index) => (
                <tr key={student.id}>
                  <td className="font-medium">{index + 1}</td>
                  <td className="text-muted-foreground">{student.nisn}</td>
                  <td className="font-medium">{student.name}</td>
                  <td>
                    <Badge variant="outline" className={cn(
                      student.gender === 'L' ? 'bg-info/10 text-info' : 'bg-pink-100 text-pink-700'
                    )}>
                      {student.gender}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      {statuses.map((status) => {
                        const StatusIcon = status.icon;
                        const isSelected = attendance[student.id] === status.value;
                        return (
                          <button
                            key={status.value}
                            onClick={() => handleAttendanceChange(student.id, status.value)}
                            className={cn(
                              'flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                              isSelected
                                ? cn(
                                    status.value === 'hadir' && 'bg-success text-success-foreground',
                                    status.value === 'sakit' && 'bg-warning text-warning-foreground',
                                    status.value === 'izin' && 'bg-info text-info-foreground',
                                    status.value === 'alpha' && 'bg-destructive text-destructive-foreground'
                                  )
                                : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                            )}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default GuruPresensi;
