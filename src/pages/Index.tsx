import { useServers } from '@/hooks/useServers';
import { Header } from '@/components/dashboard/Header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ServerCard } from '@/components/dashboard/ServerCard';
import { AlertItem } from '@/components/dashboard/AlertItem';
import { MetricsChart } from '@/components/dashboard/MetricsChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, Cpu, MemoryStick, AlertTriangle, Activity, CheckCircle } from 'lucide-react';

const Index = () => {
  const { servers, alerts, stats, acknowledgeAlert, dismissAlert } = useServers();

  const activeAlerts = alerts.filter((a) => !a.acknowledged);

  return (
    <div className="min-h-screen bg-background">
      <Header alertCount={stats.activeAlerts} />

      <main className="container px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            title="Total Servers"
            value={stats.total}
            subtitle={`${stats.healthy} healthy`}
            icon={Server}
            variant="primary"
          />
          <StatsCard
            title="Avg CPU"
            value={`${stats.avgCpu}%`}
            icon={Cpu}
            variant={stats.avgCpu > 80 ? 'warning' : 'success'}
          />
          <StatsCard
            title="Avg Memory"
            value={`${stats.avgMemory}%`}
            icon={MemoryStick}
            variant={stats.avgMemory > 85 ? 'warning' : 'success'}
          />
          <StatsCard
            title="Active Alerts"
            value={stats.activeAlerts}
            subtitle={stats.critical > 0 ? `${stats.critical} critical` : 'All systems normal'}
            icon={stats.activeAlerts > 0 ? AlertTriangle : CheckCircle}
            variant={stats.activeAlerts > 0 ? 'destructive' : 'success'}
          />
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricsChart title="CPU Usage (24h)" color="hsl(var(--primary))" />
          <MetricsChart title="Memory Usage (24h)" color="hsl(var(--chart-2))" />
          <MetricsChart title="Network I/O (24h)" color="hsl(var(--chart-3))" />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Server Grid */}
          <section className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Servers
              </h2>
              <span className="text-sm text-muted-foreground">{servers.length} total</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {servers.map((server) => (
                <ServerCard key={server.id} server={server} />
              ))}
            </div>
          </section>

          {/* Alerts Panel */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Recent Alerts
            </h2>
            <Card className="glass">
              <CardContent className="p-4 space-y-3">
                {activeAlerts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <CheckCircle className="w-10 h-10 mb-2 text-success" />
                    <p className="text-sm">No active alerts</p>
                  </div>
                ) : (
                  activeAlerts.map((alert) => (
                    <AlertItem
                      key={alert.id}
                      alert={alert}
                      onAcknowledge={acknowledgeAlert}
                      onDismiss={dismissAlert}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
