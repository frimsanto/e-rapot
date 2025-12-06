import { useEffect, useMemo, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Save, Calculator, Users, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { api } from '@/services/api';

const GuruInputNilai = () => {
  const [selectedClass, setSelectedClass] = useState('IX-A');
  const [selectedSubject] = useState('Matematika');
  const [studentsState, setStudentsState] = useState<
    { id: string; name: string; nisn: string; className?: string }[]
  >([]);
  const [grades, setGrades] = useState<
    Record<string, { tugas: number; ulangan: number; uts: number; uas: number }>
  >({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get<{ data: any[] }>(`/siswa`);
        const siswaFromApi: { id: string; name: string; nisn: string; className?: string }[] =
          (res.data ?? []).map((s: any) => ({
            id: String(s.idSiswa ?? s.id_siswa ?? s.id),
            name: s.namaLengkap ?? s.nama_lengkap ?? s.nama ?? s.name,
            nisn: s.nisn ?? '-',
            className:
              s.kelas?.namaKelas ?? s.kelas?.nama_kelas ?? s.className ?? s.class ?? '',
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
    // Inisialisasi nilai default setiap kali daftar siswa di kelas berubah
    const initial: Record<string, { tugas: number; ulangan: number; uts: number; uas: number }> = {};
    classStudents.forEach((s) => {
      initial[s.id] = { tugas: 80, ulangan: 78, uts: 82, uas: 85 };
    });
    setGrades(initial);
  }, [classStudents]);

  const calculateFinal = (g: { tugas: number; ulangan: number; uts: number; uas: number }) => {
    return Math.round(g.tugas * 0.2 + g.ulangan * 0.2 + g.uts * 0.3 + g.uas * 0.3);
  };

  const handleGradeChange = (studentId: string, field: keyof typeof grades[string], value: number) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], [field]: Math.min(100, Math.max(0, value)) },
    }));
  };

  const classes = ['VII-A', 'VII-B', 'VIII-A', 'VIII-B', 'IX-A', 'IX-B'];

  return (
    <AppLayout>
      <PageHeader
        title="Input Nilai"
        description="Input dan kelola nilai siswa"
        actions={
          <button className="btn-primary">
            <Save className="h-4 w-4" />
            Simpan Nilai
          </button>
        }
      />

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Kelas:</span>
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
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Mapel:</span>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {selectedSubject}
            </Badge>
          </div>
        </div>
      </div>

      {/* Grade Input Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Input Nilai - Kelas {selectedClass}</h3>
            <p className="text-sm text-muted-foreground">{classStudents.length} siswa • {selectedSubject}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calculator className="h-4 w-4" />
            Formula: (Tugas × 20%) + (Ulangan × 20%) + (UTS × 30%) + (UAS × 30%)
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>NISN</th>
                <th>Nama Siswa</th>
                <th className="text-center">Tugas (20%)</th>
                <th className="text-center">Ulangan (20%)</th>
                <th className="text-center">UTS (30%)</th>
                <th className="text-center">UAS (30%)</th>
                <th className="text-center">Nilai Akhir</th>
                <th className="text-center">Predikat</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.map((student, index) => {
                const g = grades[student.id] || { tugas: 0, ulangan: 0, uts: 0, uas: 0 };
                const final = calculateFinal(g);
                const predikat = final >= 85 ? 'A' : final >= 75 ? 'B' : final >= 65 ? 'C' : 'D';

                return (
                  <tr key={student.id}>
                    <td className="font-medium">{index + 1}</td>
                    <td className="text-muted-foreground">{student.nisn}</td>
                    <td className="font-medium">{student.name}</td>
                    <td className="text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={g.tugas}
                        onChange={(e) => handleGradeChange(student.id, 'tugas', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 text-center rounded border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={g.ulangan}
                        onChange={(e) => handleGradeChange(student.id, 'ulangan', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 text-center rounded border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={g.uts}
                        onChange={(e) => handleGradeChange(student.id, 'uts', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 text-center rounded border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={g.uas}
                        onChange={(e) => handleGradeChange(student.id, 'uas', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 text-center rounded border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                      />
                    </td>
                    <td className="text-center">
                      <span className={cn(
                        'text-lg font-bold',
                        final >= 85 ? 'text-success' : final >= 75 ? 'text-primary' : final >= 65 ? 'text-warning' : 'text-destructive'
                      )}>
                        {final}
                      </span>
                    </td>
                    <td className="text-center">
                      <Badge variant="outline" className={cn(
                        predikat === 'A' ? 'bg-success/10 text-success' :
                        predikat === 'B' ? 'bg-primary/10 text-primary' :
                        predikat === 'C' ? 'bg-warning/10 text-warning' :
                        'bg-destructive/10 text-destructive'
                      )}>
                        {predikat}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default GuruInputNilai;
