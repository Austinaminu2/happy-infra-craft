import { Server, Alert, MetricDataPoint } from '@/types/server';

export const mockServers: Server[] = [
  {
    id: 'srv-001',
    name: 'Production API',
    hostname: 'api-prod-01',
    ip: '10.0.1.15',
    status: 'healthy',
    uptime: 2592000, // 30 days
    location: 'US-East-1',
    os: 'Ubuntu 22.04 LTS',
    metrics: { cpu: 42, memory: 68, disk: 45, network: { in: 125, out: 89 } },
    lastUpdated: new Date(),
  },
  {
    id: 'srv-002',
    name: 'Database Primary',
    hostname: 'db-primary-01',
    ip: '10.0.1.20',
    status: 'healthy',
    uptime: 5184000, // 60 days
    location: 'US-East-1',
    os: 'Ubuntu 22.04 LTS',
    metrics: { cpu: 35, memory: 82, disk: 67, network: { in: 450, out: 380 } },
    lastUpdated: new Date(),
  },
  {
    id: 'srv-003',
    name: 'Cache Server',
    hostname: 'cache-01',
    ip: '10.0.1.25',
    status: 'warning',
    uptime: 864000, // 10 days
    location: 'US-West-2',
    os: 'Alpine Linux 3.18',
    metrics: { cpu: 78, memory: 91, disk: 23, network: { in: 890, out: 920 } },
    lastUpdated: new Date(),
  },
  {
    id: 'srv-004',
    name: 'Worker Node 1',
    hostname: 'worker-01',
    ip: '10.0.2.10',
    status: 'healthy',
    uptime: 1728000, // 20 days
    location: 'EU-West-1',
    os: 'Debian 12',
    metrics: { cpu: 55, memory: 48, disk: 38, network: { in: 67, out: 145 } },
    lastUpdated: new Date(),
  },
  {
    id: 'srv-005',
    name: 'Worker Node 2',
    hostname: 'worker-02',
    ip: '10.0.2.11',
    status: 'critical',
    uptime: 0,
    location: 'EU-West-1',
    os: 'Debian 12',
    metrics: { cpu: 98, memory: 95, disk: 89, network: { in: 12, out: 8 } },
    lastUpdated: new Date(),
  },
  {
    id: 'srv-006',
    name: 'Backup Server',
    hostname: 'backup-01',
    ip: '10.0.3.5',
    status: 'healthy',
    uptime: 7776000, // 90 days
    location: 'US-Central-1',
    os: 'Rocky Linux 9',
    metrics: { cpu: 12, memory: 34, disk: 78, network: { in: 234, out: 12 } },
    lastUpdated: new Date(),
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    serverId: 'srv-003',
    serverName: 'Cache Server',
    type: 'memory',
    severity: 'warning',
    message: 'Memory usage exceeded 90% threshold',
    timestamp: new Date(Date.now() - 300000),
    acknowledged: false,
  },
  {
    id: 'alert-002',
    serverId: 'srv-005',
    serverName: 'Worker Node 2',
    type: 'cpu',
    severity: 'critical',
    message: 'CPU usage at critical level (98%)',
    timestamp: new Date(Date.now() - 120000),
    acknowledged: false,
  },
  {
    id: 'alert-003',
    serverId: 'srv-005',
    serverName: 'Worker Node 2',
    type: 'connectivity',
    severity: 'critical',
    message: 'Server unresponsive - connection timeout',
    timestamp: new Date(Date.now() - 60000),
    acknowledged: false,
  },
  {
    id: 'alert-004',
    serverId: 'srv-002',
    serverName: 'Database Primary',
    type: 'disk',
    severity: 'info',
    message: 'Disk usage approaching 70%',
    timestamp: new Date(Date.now() - 3600000),
    acknowledged: true,
  },
];

export const generateMetricHistory = (hours: number = 24): MetricDataPoint[] => {
  const data: MetricDataPoint[] = [];
  const now = Date.now();
  const interval = (hours * 60 * 60 * 1000) / 48; // 48 data points

  for (let i = 47; i >= 0; i--) {
    data.push({
      timestamp: new Date(now - i * interval),
      value: Math.floor(30 + Math.random() * 50 + Math.sin(i / 5) * 15),
    });
  }

  return data;
};
