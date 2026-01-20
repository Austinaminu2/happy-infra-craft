export type ServerStatus = 'healthy' | 'warning' | 'critical' | 'offline';

export interface ServerMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: {
    in: number;
    out: number;
  };
}

export interface Server {
  id: string;
  name: string;
  hostname: string;
  ip: string;
  status: ServerStatus;
  uptime: number; // in seconds
  location: string;
  os: string;
  metrics: ServerMetrics;
  lastUpdated: Date;
}

export interface MetricDataPoint {
  timestamp: Date;
  value: number;
}

export interface Alert {
  id: string;
  serverId: string;
  serverName: string;
  type: 'cpu' | 'memory' | 'disk' | 'network' | 'connectivity';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}
