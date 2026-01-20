import { Alert } from '@/types/server';
import { Button } from '@/components/ui/button';
import { formatRelativeTime } from '@/lib/formatters';
import { AlertTriangle, AlertCircle, Info, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertItemProps {
  alert: Alert;
  onAcknowledge: (id: string) => void;
  onDismiss: (id: string) => void;
}

const severityConfig = {
  info: {
    icon: Info,
    className: 'border-l-primary bg-primary/5',
    iconClass: 'text-primary',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-l-warning bg-warning/5',
    iconClass: 'text-warning',
  },
  critical: {
    icon: AlertCircle,
    className: 'border-l-destructive bg-destructive/5',
    iconClass: 'text-destructive',
  },
};

export const AlertItem = ({ alert, onAcknowledge, onDismiss }: AlertItemProps) => {
  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border-l-4 transition-all',
        config.className,
        alert.acknowledged && 'opacity-60'
      )}
    >
      <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', config.iconClass)} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{alert.serverName}</span>
          <span className="text-xs text-muted-foreground">{formatRelativeTime(alert.timestamp)}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{alert.message}</p>
      </div>
      <div className="flex items-center gap-1">
        {!alert.acknowledged && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onAcknowledge(alert.id)}
          >
            <Check className="w-4 h-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-destructive"
          onClick={() => onDismiss(alert.id)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
