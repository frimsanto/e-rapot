import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';

const GuruP5 = () => {
  return (
    <AppLayout>
      <PageHeader
        title="Projek P5"
        description="Pengelolaan projek Profil Pelajar Pancasila untuk siswa. (Dummy page)"
      />
      <div className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground bg-card/40">
        Halaman ini akan digunakan untuk merencanakan, memonitor, dan menilai projek P5.
      </div>
    </AppLayout>
  );
};

export default GuruP5;
