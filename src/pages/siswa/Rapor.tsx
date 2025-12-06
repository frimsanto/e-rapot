import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/contexts/AppContext';
import { semesters } from '@/data/mockData';
import { FileText, Download, Eye, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { api } from '@/services/api';

const SiswaRapor = () => {
  const { jenjang } = useApp();

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

        // Mapel per jenjang
        const mapelRes = await api.get<{ data: any[] }>(`/mapel?jenjang=${jenjang}`);
        const subjectsFromApi: Subject[] = mapelRes.data.map((m) => ({
          id: String(m.idMapel ?? m.id_mapel ?? m.id),
          name: m.namaMapel ?? m.nama_mapel ?? m.name,
          code: m.kodeMapel ?? m.kode_mapel ?? m.code,
        }));

        // Nilai akhir untuk 1 siswa & 1 semester (sementara hardcode id siswa 1 & semester 2
        // sesuai seed awal; nanti bisa diambil dari context/user login)
        const nilaiRes = await api.get<{ data: any[] }>(`/nilai/akhir?idSiswa=1&idSemester=2`);
        const gradesFromApi: Grade[] = nilaiRes.data.map((n) => ({
          subjectId: String(n.idMapel ?? n.id_mapel ?? n.mapelId ?? n.mapel?.idMapel ?? n.mapel?.id),
          final: Number(n.skorAkhir ?? n.skor_akhir ?? n.final ?? 0),
        }));

        setSubjectsState(subjectsFromApi);
        setGradesState(gradesFromApi);
      } catch (e: any) {
        setError(e?.message ?? 'Gagal memuat data rapor');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [jenjang]);

  const avgGrade = gradesState.length
    ? Math.round(gradesState.reduce((sum, g) => sum + g.final, 0) / gradesState.length)
    : 0;

  return (
    <AppLayout>
      <PageHeader
        title="Rapor Digital"
        description="Lihat dan unduh rapor semester Anda"
      />

      {/* Rapor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {semesters.map((semester) => (
          <div
            key={semester.id}
            className={cn(
              'bg-card rounded-xl border p-6 transition-all hover:shadow-elevated',
              semester.isActive ? 'border-primary ring-2 ring-primary/20' : 'border-border'
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              {semester.isActive ? (
                <Badge className="bg-warning/10 text-warning border-warning/20">
                  <Clock className="h-3 w-3 mr-1" />
                  Berjalan
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Selesai
                </Badge>
              )}
            </div>

            <h3 className="font-semibold text-foreground mb-1">{semester.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tahun Ajaran {semester.year}
            </p>

            {!semester.isActive && (
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rata-rata Nilai</span>
                  <span className="font-semibold text-foreground">{avgGrade}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Peringkat</span>
                  <span className="font-semibold text-foreground">5 dari 30</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Kehadiran</span>
                  <span className="font-semibold text-foreground">95%</span>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button
                className={cn(
                  'flex-1 btn-primary text-sm',
                  semester.isActive && 'opacity-50 cursor-not-allowed'
                )}
                disabled={semester.isActive}
              >
                <Eye className="h-4 w-4" />
                Lihat
              </button>
              <button
                className={cn(
                  'flex-1 btn-secondary text-sm',
                  semester.isActive && 'opacity-50 cursor-not-allowed'
                )}
                disabled={semester.isActive}
              >
                <Download className="h-4 w-4" />
                Unduh
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Current Semester Preview */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Preview Rapor - Semester Genap 2023/2024</h3>
          <p className="text-sm text-muted-foreground mt-1">Data sementara sampai akhir semester</p>
        </div>

        <div className="p-6">
          {loading && (
            <p className="text-sm text-muted-foreground mb-4">Memuat data rapor dari server...</p>
          )}
          {error && !loading && (
            <p className="text-sm text-destructive mb-4">{error}</p>
          )}
          {/* Student Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-border">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Nama Siswa</span>
                <span className="font-medium text-foreground">Ahmad Fauzi</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">NISN</span>
                <span className="font-medium text-foreground">0012345678</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Kelas</span>
                <span className="font-medium text-foreground">IX-A</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tahun Ajaran</span>
                <span className="font-medium text-foreground">2023/2024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Semester</span>
                <span className="font-medium text-foreground">Genap</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Wali Kelas</span>
                <span className="font-medium text-foreground">Ibu Dewi Sartika</span>
              </div>
            </div>
          </div>

          {/* Grades Table */}
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Mata Pelajaran</th>
                  <th className="text-center">Nilai</th>
                  <th className="text-center">Predikat</th>
                  <th>Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                {gradesState.map((grade, index) => {
                  const subject = subjectsState.find((s) => s.id === grade.subjectId);
                  const predikat = grade.final >= 85 ? 'A' : grade.final >= 75 ? 'B' : grade.final >= 65 ? 'C' : 'D';

                  return (
                    <tr key={grade.subjectId}>
                      <td>{index + 1}</td>
                      <td className="font-medium">{subject?.name}</td>
                      <td className="text-center font-bold">{grade.final}</td>
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
                      <td className="text-sm text-muted-foreground">
                        {predikat === 'A' && 'Sangat baik dalam memahami konsep dan penerapan'}
                        {predikat === 'B' && 'Baik dalam memahami konsep dasar'}
                        {predikat === 'C' && 'Cukup memahami konsep dasar'}
                        {predikat === 'D' && 'Perlu bimbingan lebih lanjut'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-6 p-4 rounded-lg bg-muted/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Rata-rata</p>
                <p className="text-2xl font-bold text-foreground">{avgGrade}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Peringkat</p>
                <p className="text-2xl font-bold text-foreground">5 / 30</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kehadiran</p>
                <p className="text-2xl font-bold text-foreground">95%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SiswaRapor;
