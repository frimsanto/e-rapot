import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { api } from '@/services/api';

const statusConfig: Record<string, { icon: typeof CheckCircle; label: string; className: string }> = {
  approved: { icon: CheckCircle, label: 'Disetujui', className: 'bg-success/10 text-success' },
  pending: { icon: Clock, label: 'Menunggu', className: 'bg-warning/10 text-warning' },
  rejected: { icon: XCircle, label: 'Ditolak', className: 'bg-destructive/10 text-destructive' },
};

type RaporApprovalRow = {
  id: string;
  class: string;
  semester: string;
  status: 'approved' | 'pending' | 'rejected';
  submittedBy: string;
  submittedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  reason?: string;
};

const KepalaSekolahApproval = () => {
  const [rows, setRows] = useState<RaporApprovalRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get<{ data: RaporApprovalRow[] }>(`/rapor-approval`);
        setRows(res.data ?? []);
      } catch (e: any) {
        setError(e?.message ?? 'Gagal memuat data approval rapor');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <AppLayout>
      <PageHeader title="Approval Rapor" description="Setujui atau tolak rapor kelas" />
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {loading && (
          <div className="p-4 text-sm text-muted-foreground">Memuat data approval rapor dari server...</div>
        )}
        {error && !loading && (
          <div className="p-4 text-sm text-destructive border-b border-border">{error}</div>
        )}
        {!loading && !error && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Kelas</th>
                <th>Semester</th>
                <th>Diajukan Oleh</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((rapor) => {
                const config = statusConfig[rapor.status];
                const Icon = config.icon;
                return (
                  <tr key={rapor.id}>
                    <td className="font-semibold">{rapor.class}</td>
                    <td>{rapor.semester}</td>
                    <td>{rapor.submittedBy}</td>
                    <td>{rapor.submittedAt}</td>
                    <td>
                      <Badge variant="outline" className={cn(config.className)}>
                        <Icon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                    </td>
                    <td>
                      {rapor.status === 'pending' && (
                        <div className="flex gap-2">
                          <button className="btn-primary text-xs py-1 px-2">
                            <CheckCircle className="h-3 w-3" />
                            Setuju
                          </button>
                          <button className="btn-ghost text-xs py-1 px-2 text-destructive">
                            <XCircle className="h-3 w-3" />
                            Tolak
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </AppLayout>
  );
};

export default KepalaSekolahApproval;
