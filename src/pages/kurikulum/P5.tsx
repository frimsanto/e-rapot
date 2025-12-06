import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';

const KurikulumP5 = () => {
  return (
    <AppLayout>
      <PageHeader
        title="Projek P5"
        description="Perencanaan kurikulum dan template projek Profil Pelajar Pancasila. (Dummy page)"
      />
      <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground bg-card/40">
        Halaman ini akan digunakan untuk mendesain tema, capaian, dan instrumen penilaian P5.
      </div>
    </AppLayout>
  );
};

export default KurikulumP5;
