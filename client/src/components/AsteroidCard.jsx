import { Rocket, Ruler, Zap, AlertTriangle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const AsteroidCard = ({ data }) => {
  const getRiskVariant = (score) => {
    if (score > 75) return "destructive";
    if (score > 50) return "warning";
    return "success";
  };

  const getRiskLabel = (score) => {
    if (score > 75) return "CRITICAL";
    if (score > 50) return "WARNING";
    return "SAFE";
  };

  const riskScore = data.riskScore ?? 0;
  const isHighRisk = riskScore > 75;
  const isWarning = riskScore > 50 && riskScore <= 75;
  const borderAccent = isHighRisk
    ? 'border-l-4 border-l-red-500/60 hover:border-red-500/40 hover:shadow-[0_0_24px_-8px_rgba(239,68,68,0.25)]'
    : isWarning
      ? 'border-l-4 border-l-amber-500/50 hover:border-amber-500/40 hover:shadow-[0_0_24px_-8px_rgba(245,158,11,0.2)]'
      : 'border-l-4 border-l-green-500/40 hover:border-accent-purple/30 hover:shadow-[0_0_24px_-8px_rgba(139,92,246,0.2)]';

  return (
    <Card className={`group glass-card ${borderAccent} transition-all duration-200`}>
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-3">
        <CardTitle className="font-heading text-lg font-bold truncate text-white">
          {data.name.replace(/[()]/g, '')}
        </CardTitle>
        <Badge variant={getRiskVariant(riskScore)} className="shrink-0 font-medium">
          {getRiskLabel(riskScore)}
        </Badge>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-4">
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3 group-hover:bg-white/[0.07] transition-colors">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-purple/20 border border-accent-purple/20">
              <Calendar className="h-5 w-5 text-accent-purple" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-500">Approach Date</p>
              <p className="text-sm font-semibold text-white tabular-nums">{data.approachDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-white/5 bg-white/[0.04] p-3 hover:bg-white/[0.06] transition-colors">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <Ruler className="h-3.5 w-3.5" /> Diameter
              </span>
              <span className="mt-1 block font-mono text-sm font-medium text-white">{Math.round(data.diameter)} m</span>
            </div>
            <div className="rounded-lg border border-white/5 bg-white/[0.04] p-3 hover:bg-white/[0.06] transition-colors">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <Rocket className="h-3.5 w-3.5" /> Velocity
              </span>
              <span className="mt-1 block font-mono text-sm font-medium text-white">{Math.round(data.velocity / 1000)}k km/h</span>
            </div>
            <div className="col-span-2 rounded-lg border border-accent-purple/20 bg-accent-purple/10 p-3">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <Zap className="h-3.5 w-3.5 text-accent-purple" /> Miss Distance
              </span>
              <span className="mt-1 block font-mono text-sm font-semibold text-accent-purple">
                {(data.distance / 1000000).toFixed(2)} million km
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AsteroidCard;