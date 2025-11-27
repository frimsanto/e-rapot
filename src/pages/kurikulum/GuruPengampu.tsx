import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { useApp } from '@/contexts/AppContext';
import { subjects, classes, users } from '@/data/mockData';
import { Plus, Edit, Trash2, UserCheck, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const guruMapping = [
  { id: '1', guru: 'Pak Agus', nip: '197801012005011002', mapel: 'Matematika', classes: ['VII-A', 'VII-B', 'VIII-A', 'VIII-B', 'IX-A', 'IX-B'] },
  { id: '2', guru: 'Ibu Sri Wahyuni', nip: '198501012010012001', mapel: 'Bahasa Indonesia', classes: ['VIII-A', 'VIII-B', 'IX-A', 'IX-B'] },
  { id: '3', guru: 'Pak Bambang', nip: '197801012005011001', mapel: 'IPA', classes: ['VII-A', 'VII-B', 'IX-A', 'IX-B'] },
  { id: '4', guru: 'Ibu Maya', nip: '198201012008012002', mapel: 'Bahasa Inggris', classes: ['VII-A', 'VIII-A', 'IX-A'] },
  { id: '5', guru: 'Pak Dedi', nip: '197901012006011001', mapel: 'IPS', classes: ['VII-B', 'VIII-B', 'IX-B'] },
  { id: '6', guru: 'Ibu Ratna', nip: '198301012009012001', mapel: 'PKn', classes: ['VII-A', 'VII-B', 'VIII-A', 'VIII-B'] },
];

const KurikulumGuruPengampu = () => {
  const { jenjang } = useApp();

  return (
    <AppLayout>
      <PageHeader
        title="Guru Pengampu"
        description="Mapping guru dengan mata pelajaran dan kelas"
        actions={
          <button className="btn-primary">
            <Plus className="h-4 w-4" />
            Tambah Mapping
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Total Guru</p>
          <p className="text-3xl font-bold text-foreground">{guruMapping.length}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Mapel Diampu</p>
          <p className="text-3xl font-bold text-primary">{new Set(guruMapping.map(g => g.mapel)).size}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-muted-foreground">Total Penugasan</p>
          <p className="text-3xl font-bold text-foreground">{guruMapping.reduce((sum, g) => sum + g.classes.length, 0)}</p>
        </div>
      </div>

      {/* Mapping Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Daftar Guru Pengampu</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Guru</th>
                <th>NIP</th>
                <th>Mata Pelajaran</th>
                <th>Kelas Diampu</th>
                <th className="text-center">Jumlah</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {guruMapping.map((guru, index) => (
                <tr key={guru.id}>
                  <td className="font-medium">{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserCheck className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">{guru.guru}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{guru.nip}</td>
                  <td>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {guru.mapel}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {guru.classes.map((cls) => (
                        <Badge key={cls} variant="outline" className="text-xs">{cls}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="text-center font-semibold">{guru.classes.length}</td>
                  <td>
                    <div className="flex justify-center gap-1">
                      <button className="btn-ghost p-2">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="btn-ghost p-2 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default KurikulumGuruPengampu;
