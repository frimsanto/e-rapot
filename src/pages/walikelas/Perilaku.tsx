import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';

const WaliKelasPerilaku = () => {
  return (
    <AppLayout>
      <PageHeader
        title="Catatan Perilaku (SD)"
        description="Rekap sikap dan catatan perilaku siswa dalam kelas. (Dummy page)"
      />
      <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground bg-card/40">
        Halaman ini akan digunakan untuk mengelola catatan sikap, pelanggaran, dan apresiasi siswa.
      </div>
    </AppLayout>
  );
};

export default WaliKelasPerilaku;
