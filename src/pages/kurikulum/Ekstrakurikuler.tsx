import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';

const KurikulumEkstrakurikuler = () => {
  return (
    <AppLayout>
      <PageHeader
        title="Ekstrakurikuler"
        description="Perencanaan dan manajemen kegiatan ekstrakurikuler sekolah. (Dummy page)"
      />
      <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground bg-card/40">
        Halaman ini akan digunakan untuk mengatur jenis kegiatan, pembina, dan jadwal ekstrakurikuler.
      </div>
    </AppLayout>
  );
};

export default KurikulumEkstrakurikuler;
