import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import AsteroidCard from '../components/AsteroidCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Activity, AlertTriangle, ShieldCheck, Telescope } from 'lucide-react';

const Dashboard = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/asteroids');
        setAsteroids(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Calculate Stats (Memoized for performance)
  const stats = useMemo(() => {
    const total = asteroids.length;
    const hazardous = asteroids.filter(a => a.isHazardous || a.riskScore > 75).length;
    const safe = total - hazardous;
    
    // Find closest asteroid
    const closest = asteroids.reduce((prev, curr) => 
      (prev.distance < curr.distance ? prev : curr), asteroids[0] || {}
    );

    return { total, hazardous, safe, closest };
  }, [asteroids]);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="h-9 w-48 rounded-lg bg-white/5 animate-pulse" />
          <div className="h-9 w-36 rounded-lg bg-white/5 animate-pulse" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border border-white/10 glass-card p-6 animate-pulse">
              <div className="flex justify-between mb-3">
                <div className="h-4 w-24 rounded bg-white/10" />
                <div className="h-8 w-8 rounded-lg bg-white/10" />
              </div>
              <div className="h-8 w-16 rounded bg-white/10 mb-2" />
              <div className="h-3 w-20 rounded bg-white/5" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl border border-white/10 glass-card p-6 animate-pulse">
              <div className="flex justify-between mb-4">
                <div className="h-5 w-32 rounded bg-white/10" />
                <div className="h-6 w-16 rounded-full bg-white/10" />
              </div>
              <div className="h-14 rounded-lg bg-white/5 mb-4" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-10 rounded-lg bg-white/5" />
                <div className="h-10 rounded-lg bg-white/5" />
                <div className="h-10 rounded-lg bg-white/5 col-span-2" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <Activity className="h-10 w-10 animate-pulse text-accent-purple mb-3" />
          <p className="text-sm font-medium">Initializing Deep Space Network...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white">Live Monitor</h2>
        <span className="text-xs sm:text-sm text-gray-500 font-mono tabular-nums bg-white/[0.04] border border-white/10 px-2.5 sm:px-3 py-1.5 rounded-lg truncate max-w-[180px] sm:max-w-none">
          Last updated {new Date().toLocaleTimeString()}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card border-white/10 hover:border-blue-500/30 hover:shadow-[0_0_24px_-8px_rgba(59,130,246,0.2)] transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Objects</CardTitle>
            <div className="p-1.5 rounded-lg bg-blue-500/20 border border-blue-500/20">
              <Telescope className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-heading text-2xl font-bold text-white">{stats.total}</div>
            <p className="text-xs text-gray-500 mt-0.5">Tracked in last 24h</p>
          </CardContent>
        </Card>

        <Card className={`glass-card border-white/10 transition-all duration-200 ${stats.hazardous > 0 ? 'hover:border-red-500/30 hover:shadow-[0_0_24px_-8px_rgba(239,68,68,0.2)]' : 'hover:border-white/20'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Threat Level</CardTitle>
            <div className={`p-1.5 rounded-lg border ${stats.hazardous > 0 ? 'bg-red-500/20 border-red-500/30' : 'bg-white/10 border-white/10'}`}>
              <AlertTriangle className={`h-4 w-4 ${stats.hazardous > 0 ? 'text-red-400 animate-pulse' : 'text-gray-500'}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`font-heading text-2xl font-bold ${stats.hazardous > 0 ? 'text-red-400' : 'text-white'}`}>
              {stats.hazardous} Detected
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Potentially Hazardous</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10 hover:border-green-500/30 hover:shadow-[0_0_24px_-8px_rgba(34,197,94,0.2)] transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Safe Objects</CardTitle>
            <div className="p-1.5 rounded-lg bg-green-500/20 border border-green-500/20">
              <ShieldCheck className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-heading text-2xl font-bold text-green-400">{stats.safe}</div>
            <p className="text-xs text-gray-500 mt-0.5">Low risk trajectory</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10 hover:border-amber-500/30 hover:shadow-[0_0_24px_-8px_rgba(245,158,11,0.2)] transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Closest Pass</CardTitle>
            <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-500/20">
              <Activity className="h-4 w-4 text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="font-heading text-2xl font-bold text-white">
              {(stats.closest?.distance / 1000000).toFixed(1)}M <span className="text-sm font-normal text-gray-500">km</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {stats.closest?.name?.replace(/[()]/g, '') || 'N/A'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="font-heading text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Near-Earth Objects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {asteroids.map((ast) => (
            <AsteroidCard key={ast._id || ast.nasaId} data={ast} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;