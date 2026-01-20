import { useState, useEffect, useCallback } from 'react';
import { Server, Alert } from '@/types/server';
import { mockServers, mockAlerts } from '@/data/mockServers';

export const useServers = () => {
  const [servers, setServers] = useState<Server[]>(mockServers);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    setIsLoading(false);

    const interval = setInterval(() => {
      setServers((prev) =>
        prev.map((server) => ({
          ...server,
          metrics: {
            cpu: Math.min(100, Math.max(5, server.metrics.cpu + (Math.random() - 0.5) * 10)),
            memory: Math.min(100, Math.max(10, server.metrics.memory + (Math.random() - 0.5) * 5)),
            disk: server.metrics.disk,
            network: {
              in: Math.max(0, server.metrics.network.in + (Math.random() - 0.5) * 50),
              out: Math.max(0, server.metrics.network.out + (Math.random() - 0.5) * 50),
            },
          },
          lastUpdated: new Date(),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  }, []);

  const dismissAlert = useCallback((alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  }, []);

  const stats = {
    total: servers.length,
    healthy: servers.filter((s) => s.status === 'healthy').length,
    warning: servers.filter((s) => s.status === 'warning').length,
    critical: servers.filter((s) => s.status === 'critical').length,
    offline: servers.filter((s) => s.status === 'offline').length,
    avgCpu: Math.round(servers.reduce((acc, s) => acc + s.metrics.cpu, 0) / servers.length),
    avgMemory: Math.round(servers.reduce((acc, s) => acc + s.metrics.memory, 0) / servers.length),
    activeAlerts: alerts.filter((a) => !a.acknowledged).length,
  };

  return {
    servers,
    alerts,
    stats,
    isLoading,
    acknowledgeAlert,
    dismissAlert,
  };
};
