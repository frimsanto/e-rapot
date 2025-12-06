import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';

const KepalaSekolahPKL = () => {
  return (
    <AppLayout>
      <PageHeader
        title="PKL / Prakerin (SMK)"
        description="Monitoring pelaksanaan PKL dan rekapan nilai siswa SMK. (Dummy page)"
      />
      <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground bg-card/40">
        Halaman ini akan digunakan kepala sekolah untuk memonitor status PKL, mitra industri, dan hasil penilaian.
      </div>
    </AppLayout>
  );
};

export default KepalaSekolahPKL;
