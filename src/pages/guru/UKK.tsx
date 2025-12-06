import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';

const GuruUKK = () => {
  return (
    <AppLayout>
      <PageHeader
        title="UKK"
        description="Pengelolaan nilai Uji Kompetensi Keahlian siswa. (Dummy page)"
      />
      <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground bg-card/40">
        Halaman ini akan digunakan untuk menginput dan merekap nilai UKK per kompetensi.
      </div>
    </AppLayout>
  );
};

export default GuruUKK;
