import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';

const KurikulumPKL = () => {
  return (
    <AppLayout>
      <PageHeader
        title="PKL / Prakerin"
        description="Kebijakan dan struktur penilaian PKL untuk SMK. (Dummy page)"
      />
      <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground bg-card/40">
        Halaman ini akan digunakan untuk mengelola mitra industri, durasi, dan skema penilaian PKL.
      </div>
    </AppLayout>
  );
};

export default KurikulumPKL;
