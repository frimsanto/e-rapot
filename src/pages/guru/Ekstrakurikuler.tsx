import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';

const GuruEkstrakurikuler = () => {
  return (
    <AppLayout>
      <PageHeader
        title="Ekstrakurikuler"
        description="Pengelolaan kegiatan ekstrakurikuler dan penilaian keikutsertaan siswa. (Dummy page)"
      />
      <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground bg-card/40">
        Halaman ini akan digunakan untuk mengelola jadwal, anggota, dan nilai ekstrakurikuler.
      </div>
    </AppLayout>
  );
};

export default GuruEkstrakurikuler;
