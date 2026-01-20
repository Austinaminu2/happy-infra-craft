import { Server } from '@/types/server';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import { MetricGauge } from './MetricGauge';
import { formatUptime, formatNetworkSpeed } from '@/lib/formatters';
import { Cpu, HardDrive, MemoryStick, ArrowDownUp, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServerCardProps {
  server: Server;
}

export const ServerCard = ({ server }: ServerCardProps) => {
  const glowClass = {
    healthy: 'hover:glow-success',
    warning: 'hover:glow-warning',
    critical: 'glow-destructive',
    offline: '',
  }[server.status];

  return (
    <Card
      className={cn(
        'glass transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-slide-up',
        glowClass
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">{server.name}</h3>
            <p className="text-xs text-muted-foreground font-mono">{server.hostname}</p>
          </div>
          <StatusBadge status={server.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{server.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatUptime(server.uptime)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <MetricGauge
            value={server.metrics.cpu}
            label="CPU"
            icon={<Cpu className="w-3.5 h-3.5" />}
          />
          <MetricGauge
            value={server.metrics.memory}
            label="Memory"
            icon={<MemoryStick className="w-3.5 h-3.5" />}
          />
          <MetricGauge
            value={server.metrics.disk}
            label="Disk"
            icon={<HardDrive className="w-3.5 h-3.5" />}
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ArrowDownUp className="w-3.5 h-3.5" />
            <span>Network</span>
          </div>
          <div className="flex gap-3 text-xs font-mono">
            <span className="text-success">↓ {formatNetworkSpeed(server.metrics.network.in)}</span>
            <span className="text-primary">↑ {formatNetworkSpeed(server.metrics.network.out)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
