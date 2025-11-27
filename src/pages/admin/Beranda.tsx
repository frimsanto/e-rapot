import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { Users, Database, Shield, Server } from 'lucide-react';

const AdminBeranda = () => (
  <AppLayout>
    <PageHeader title="Dashboard Admin" description="Kelola sistem E-Raport PRO" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatsCard title="Total User" value={156} icon={Users} />
      <StatsCard title="Database" value="2.4 GB" icon={Database} />
      <StatsCard title="Active Sessions" value={45} icon={Shield} />
      <StatsCard title="System Uptime" value="99.9%" icon={Server} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">User Terbaru</h3>
        <div className="space-y-3">
          {['Ahmad Fauzi (Siswa)', 'Ibu Sri Wahyuni (Guru)', 'Pak Bambang (Kurikulum)'].map((u, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-foreground">{u}</span>
              <span className="text-xs text-muted-foreground">Baru</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
        <div className="space-y-3">
          {[{ name: 'Database', status: 'Online' }, { name: 'Storage', status: 'Online' }, { name: 'Auth Service', status: 'Online' }].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-foreground">{s.name}</span>
              <span className="text-xs text-success font-medium">{s.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </AppLayout>
);
export default AdminBeranda;
