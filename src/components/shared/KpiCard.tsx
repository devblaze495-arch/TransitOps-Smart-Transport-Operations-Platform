import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface KpiCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  trend: number;
  trendLabel: string;
  trendDirection: 'up' | 'down';
}

export function KpiCard({ icon: Icon, label, value, trend, trendLabel, trendDirection }: KpiCardProps) {
  const trendColor = trendDirection === 'up' ? 'text-success' : 'text-danger';
  const TrendIcon = trendDirection === 'up' ? ArrowUp : ArrowDown;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-black/10"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className={cn('inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium', trendColor)}>
          <TrendIcon className="h-3.5 w-3.5" />
          <span>{trend}%</span>
        </div>
      </div>
      <p className="mt-5 text-xs uppercase tracking-[0.18em] text-text-secondary">{label}</p>
      <p className="mt-2 text-4xl font-bold text-text-primary">{value.toLocaleString()}</p>
      <p className="mt-2 text-xs text-text-secondary">{trendLabel}</p>
    </motion.div>
  );
}
