import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';

const KepalaSekolahUKK = () => {
  return (
    <AppLayout>
      <PageHeader
        title="UKK (SMK)"
        description="Monitoring pelaksanaan dan hasil Uji Kompetensi Keahlian siswa SMK. (Dummy page)"
      />
      <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground bg-card/40">
        Halaman ini akan digunakan kepala sekolah untuk melihat rekap nilai UKK, penguji, dan tingkat kelulusan.
      </div>
    </AppLayout>
  );
};

export default KepalaSekolahUKK;
