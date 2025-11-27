import { AppLayout } from '@/components/layout/AppLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { documents } from '@/data/mockData';
import { FileText, Download, Eye, Award, CreditCard, Mail, File } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const SiswaDokumen = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'rapor':
        return FileText;
      case 'certificate':
        return Award;
      case 'card':
        return CreditCard;
      case 'letter':
        return Mail;
      default:
        return File;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'rapor':
        return 'Rapor';
      case 'certificate':
        return 'Sertifikat';
      case 'card':
        return 'Kartu';
      case 'letter':
        return 'Surat';
      default:
        return 'Dokumen';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'rapor':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'certificate':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'card':
        return 'bg-info/10 text-info border-info/20';
      case 'letter':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Dokumen"
        description="Akses dokumen akademik dan sertifikat Anda"
      />

      {/* Document Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {['rapor', 'certificate', 'card', 'letter'].map((type) => {
          const Icon = getTypeIcon(type);
          const count = documents.filter((d) => d.type === type).length;

          return (
            <div key={type} className="stat-card">
              <div className="flex items-center gap-3">
                <div className={cn('h-10 w-10 rounded-lg flex items-center justify-center', getTypeColor(type).split(' ')[0])}>
                  <Icon className={cn('h-5 w-5', getTypeColor(type).split(' ')[1])} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{count}</p>
                  <p className="text-sm text-muted-foreground">{getTypeLabel(type)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Document List */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Semua Dokumen</h3>
        </div>
        <div className="divide-y divide-border">
          {documents.map((doc) => {
            const Icon = getTypeIcon(doc.type);

            return (
              <div
                key={doc.id}
                className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={cn('h-12 w-12 rounded-lg flex items-center justify-center', getTypeColor(doc.type).split(' ')[0])}>
                    <Icon className={cn('h-6 w-6', getTypeColor(doc.type).split(' ')[1])} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{doc.name}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{new Date(doc.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getTypeColor(doc.type)}>
                    {getTypeLabel(doc.type)}
                  </Badge>
                  <button className="btn-ghost p-2">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="btn-primary p-2">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default SiswaDokumen;
