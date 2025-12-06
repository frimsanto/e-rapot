import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';

const KurikulumUKK = () => {
  return (
    <AppLayout>
      <PageHeader
        title="UKK"
        description="Perencanaan skema dan kriteria penilaian UKK. (Dummy page)"
      />
      <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground bg-card/40">
        Halaman ini akan digunakan untuk mendesain paket soal, penguji, dan bobot penilaian UKK.
      </div>
    </AppLayout>
  );
};

export default KurikulumUKK;
