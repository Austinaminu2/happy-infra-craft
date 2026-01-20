# 🖥️ InfraPulse

<div align="center">

![InfraPulse Banner](https://img.shields.io/badge/InfraPulse-Server%20Monitoring-blue?style=for-the-badge&logo=server&logoColor=white)

**A modern, real-time server monitoring dashboard built with React, TypeScript, and Tailwind CSS.**

[![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Demo](#demo) • [Features](#features) • [Installation](#installation) • [Usage](#usage) • [Architecture](#architecture) • [Contributing](#contributing)

</div>

---

## 📸 Demo

<div align="center">
  <p><em>Real-time server monitoring with live metrics, alerts, and beautiful visualizations.</em></p>
</div>

---

## ✨ Features

### 📊 Real-Time Monitoring
- **Live Metrics** - CPU, memory, disk, and network statistics updated every 3 seconds
- **Visual Gauges** - Color-coded progress bars with threshold indicators
- **Historical Charts** - 24-hour performance trends with interactive tooltips

### 🖥️ Server Management
- **Server Cards** - At-a-glance view of all servers with key metrics
- **Status Badges** - Healthy, Warning, Critical, and Offline states
- **Location & Uptime** - Geographic distribution and availability tracking

### 🚨 Alert System
- **Priority Levels** - Info, Warning, and Critical severity classifications
- **Acknowledge & Dismiss** - Manage alerts with quick actions
- **Real-Time Updates** - Instant notification of new issues

### 🎨 Modern UI/UX
- **Glass Morphism** - Beautiful frosted glass design aesthetic
- **Dark/Light Mode** - Full theme support with system preference detection
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations** - Subtle transitions and hover effects

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn or bun

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/infrapulse.git
cd infrapulse

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── AlertItem.tsx      # Individual alert component
│   │   ├── Header.tsx         # App header with theme toggle
│   │   ├── MetricGauge.tsx    # Circular metric indicator
│   │   ├── MetricsChart.tsx   # Time-series area chart
│   │   ├── ServerCard.tsx     # Server status card
│   │   ├── StatsCard.tsx      # Summary statistic card
│   │   └── StatusBadge.tsx    # Server status indicator
│   └── ui/                    # shadcn/ui components
├── data/
│   └── mockServers.ts         # Mock server data & generators
├── hooks/
│   └── useServers.ts          # Server state management hook
├── lib/
│   ├── formatters.ts          # Utility formatting functions
│   └── utils.ts               # General utilities
├── pages/
│   └── Index.tsx              # Main dashboard page
├── types/
│   └── server.ts              # TypeScript interfaces
└── index.css                  # Global styles & design tokens
```

---

## 🏗️ Architecture

### Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **TypeScript** | Type safety & developer experience |
| **Vite** | Fast build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Accessible component library |
| **Recharts** | Data visualization |
| **Lucide React** | Icon library |

### Design Patterns

- **Custom Hooks** - Encapsulated state logic (`useServers`)
- **Compound Components** - Flexible, composable UI pieces
- **Design Tokens** - Centralized theming via CSS variables
- **Type-First** - Full TypeScript coverage with strict mode

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file for configuration:

```env
# API Configuration (for future backend integration)
VITE_API_URL=https://api.example.com
VITE_REFRESH_INTERVAL=3000

# Feature Flags
VITE_ENABLE_NOTIFICATIONS=true
```

### Theme Customization

Modify `src/index.css` to customize the design system:

```css
:root {
  --primary: 220 90% 56%;        /* Primary brand color */
  --success: 142 76% 36%;        /* Healthy status */
  --warning: 38 92% 50%;         /* Warning status */
  --destructive: 0 72% 51%;      /* Critical status */
}
```

---

## 📖 Usage

### Adding New Servers

Extend the mock data in `src/data/mockServers.ts`:

```typescript
{
  id: 'srv-007',
  name: 'New Server',
  hostname: 'new-srv-01',
  ip: '10.0.4.1',
  status: 'healthy',
  uptime: 86400,
  location: 'US-West-1',
  os: 'Ubuntu 22.04 LTS',
  metrics: { cpu: 25, memory: 40, disk: 30, network: { in: 100, out: 50 } },
  lastUpdated: new Date(),
}
```

### Connecting to a Real Backend

Replace the mock data with API calls in `useServers.ts`:

```typescript
useEffect(() => {
  const fetchServers = async () => {
    const response = await fetch('/api/servers');
    const data = await response.json();
    setServers(data);
  };
  
  fetchServers();
  const interval = setInterval(fetchServers, 3000);
  return () => clearInterval(interval);
}, []);
```

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Recharts](https://recharts.org/) for data visualization
- [Lucide](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

<div align="center">
  <p>Built with ❤️ using <a href="https://lovable.dev">Lovable</a></p>
</div>
