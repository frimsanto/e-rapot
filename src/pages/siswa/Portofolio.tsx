import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Badge } from '@/components/ui/badge';
import { studentNotes, documents, extracurriculars } from '@/data/mockData';

const SiswaPortofolio = () => {
  const prestasi = studentNotes.filter((n) => n.type === 'achievement');

  return (
    <AppLayout>
      <PageHeader
        title="Portofolio Siswa"
        description="Ringkasan prestasi, sertifikat, dan aktivitas organisasi Anda."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prestasi */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Prestasi Akademik & Non-Akademik</h3>
          <div className="space-y-3">
            {prestasi.map((item) => (
              <div key={item.id} className="p-3 rounded-lg border border-border flex justify-between items-start">
                <div>
                  <p className="font-medium text-foreground mb-1">{item.studentName}</p>
                  <p className="text-sm text-muted-foreground">{item.note}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.date} • oleh {item.author}</p>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                  Prestasi
                </Badge>
              </div>
            ))}
            {prestasi.length === 0 && (
              <div className="text-sm text-muted-foreground">Belum ada data prestasi. Data ini akan terisi dari penilaian wali kelas dan guru.</div>
            )}
          </div>
        </div>

        {/* Ekstrakurikuler aktif */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Aktivitas Ekstrakurikuler</h3>
          <div className="space-y-3">
            {extracurriculars.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3 rounded-lg border border-border">
                <p className="font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">Pembina: {item.coach}</p>
                <p className="text-xs text-muted-foreground mt-1">Jadwal: {item.schedule}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dokumen penting */}
      <div className="mt-6 bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Dokumen Pendukung</h3>
        <div className="space-y-2 text-sm">
          {documents.slice(0, 5).map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
              <div>
                <p className="font-medium text-foreground">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.date} • {doc.size}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {doc.type}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default SiswaPortofolio;
