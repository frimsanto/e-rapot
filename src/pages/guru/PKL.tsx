import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';

const GuruPKL = () => {
  return (
    <AppLayout>
      <PageHeader
        title="PKL / Prakerin"
        description="Monitoring dan penilaian praktik kerja lapangan siswa. (Dummy page)"
      />
      <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground bg-card/40">
        Halaman ini akan digunakan untuk mencatat tempat PKL, jurnal kegiatan, dan nilai akhir.
      </div>
    </AppLayout>
  );
};

export default GuruPKL;
