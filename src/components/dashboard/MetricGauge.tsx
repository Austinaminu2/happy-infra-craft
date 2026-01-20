import { cn } from '@/lib/utils';

interface MetricGaugeProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const getColorClass = (value: number): string => {
  if (value >= 90) return 'text-destructive';
  if (value >= 75) return 'text-warning';
  return 'text-success';
};

const getProgressClass = (value: number): string => {
  if (value >= 90) return 'bg-destructive';
  if (value >= 75) return 'bg-warning';
  return 'bg-success';
};

export const MetricGauge = ({ value, label, icon, size = 'md' }: MetricGaugeProps) => {
  const roundedValue = Math.round(value);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          {icon}
          <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
        </div>
        <span className={cn('text-sm font-bold font-mono', getColorClass(roundedValue))}>
          {roundedValue}%
        </span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', getProgressClass(roundedValue))}
          style={{ width: `${roundedValue}%` }}
        />
      </div>
    </div>
  );
};
