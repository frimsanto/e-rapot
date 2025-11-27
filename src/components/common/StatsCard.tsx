import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
  iconClassName?: string;
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  description,
  className,
  iconClassName,
}: StatsCardProps) => {
  return (
    <div className={cn('stat-card animate-fade-in', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.isPositive ? 'text-success' : 'text-destructive'
                )}
              >
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-sm text-muted-foreground">dari bulan lalu</span>
            </div>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10',
          iconClassName
        )}>
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
};
