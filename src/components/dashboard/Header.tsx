import { Button } from '@/components/ui/button';
import { RefreshCw, Moon, Sun, Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HeaderProps {
  alertCount: number;
}

export const Header = ({ alertCount }: HeaderProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-lg">
            IP
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">InfraPulse</h1>
            <p className="text-xs text-muted-foreground">Server Monitoring</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold bg-destructive text-destructive-foreground rounded-full">
                {alertCount}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon">
            <RefreshCw className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};
