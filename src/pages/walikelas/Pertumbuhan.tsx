import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';

const WaliKelasPertumbuhan = () => {
  return (
    <AppLayout>
      <PageHeader
        title="Perkembangan Siswa (SD)"
        description="Ringkasan pertumbuhan tinggi/berat dan perkembangan siswa dalam satu kelas. (Dummy page)"
      />
      <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground bg-card/40">
        Halaman ini akan digunakan untuk melihat rekap pertumbuhan fisik dan perkembangan siswa per kelas.
      </div>
    </AppLayout>
  );
};

export default WaliKelasPertumbuhan;
