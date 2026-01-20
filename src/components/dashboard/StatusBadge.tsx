import { ServerStatus } from '@/types/server';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ServerStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<ServerStatus, { label: string; className: string; dotClass: string }> = {
  healthy: {
    label: 'Healthy',
    className: 'bg-success/10 text-success border-success/20',
    dotClass: 'bg-success',
  },
  warning: {
    label: 'Warning',
    className: 'bg-warning/10 text-warning border-warning/20',
    dotClass: 'bg-warning',
  },
  critical: {
    label: 'Critical',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
    dotClass: 'bg-destructive',
  },
  offline: {
    label: 'Offline',
    className: 'bg-muted text-muted-foreground border-border',
    dotClass: 'bg-muted-foreground',
  },
};

const sizeConfig = {
  sm: { badge: 'px-2 py-0.5 text-xs', dot: 'w-1.5 h-1.5' },
  md: { badge: 'px-2.5 py-1 text-xs', dot: 'w-2 h-2' },
  lg: { badge: 'px-3 py-1.5 text-sm', dot: 'w-2.5 h-2.5' },
};

export const StatusBadge = ({ status, showLabel = true, size = 'md' }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const sizes = sizeConfig[size];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        config.className,
        sizes.badge
      )}
    >
      <span
        className={cn(
          'rounded-full animate-pulse-glow',
          config.dotClass,
          sizes.dot
        )}
      />
      {showLabel && config.label}
    </span>
  );
};
